"""Discrete-event model for synthetic loading and hauling data."""

from __future__ import annotations

import random
from typing import Any

import simpy

from .config import index_by, minutes, parse_epoch, triangular_minutes
from .events import EventLog


class MineSimulation:
    """SimPy model of shovels, trucks, routes and destinations.

    The model is intentionally small: it generates the operating events needed
    for a loading/hauling dataset. It does not model drilling, blasting,
    crushing dynamics, maintenance work orders or dispatch optimization.
    """

    def __init__(self, config: dict[str, Any], seed: int) -> None:
        self.config = config
        self.seed = seed
        self.env = simpy.Environment()

        shift = config["shift"]
        self.shift_id = shift["id"]
        self.shift_end_s = minutes(shift["duration_min"])
        self.grace_end_s = self.shift_end_s + minutes(shift["grace_min"])
        self.shift_duration_min = float(shift["duration_min"])

        self.trucks = index_by(config["fleet"]["trucks"], "id")
        self.shovels = index_by(config["fleet"]["shovels"], "id")
        self.fronts = index_by(config["fronts"], "id")
        self.destinations = index_by(config["destinations"], "id")
        self.routes = index_by(config["routes"], "id")

        self.log = EventLog(
            run_id=config["run_id"],
            shift_id=self.shift_id,
            site_id=config["site_id"],
            simulated_epoch=parse_epoch(shift["simulated_epoch"]),
            real_epoch=parse_epoch(shift["real_epoch"]),
        )

        self.shovel_resources = {
            shovel_id: simpy.Resource(self.env, capacity=1)
            for shovel_id in self.shovels
        }
        self.destination_resources = {
            destination_id: simpy.Resource(self.env, capacity=1)
            for destination_id in self.destinations
        }
        self.shovel_rng = {
            shovel_id: random.Random(f"{seed}:{shovel_id}")
            for shovel_id in self.shovels
        }
        self.destination_rng = {
            destination_id: random.Random(f"{seed}:{destination_id}")
            for destination_id in self.destinations
        }

        disruptions = config.get("disruptions", {})
        self.downtime = disruptions.get("truck_downtime")
        self.downtime_done = False
        if self.downtime:
            self.downtime_s = (
                float(self.downtime["fraction_of_shift"])
                * self.shift_duration_min
                * 60.0
            )
        else:
            self.downtime_s = 0.0

    def run(self) -> list[dict[str, Any]]:
        """Run the simulation until the shift grace window closes."""
        for truck_id in sorted(self.trucks):
            self.env.process(self.truck_process(self.trucks[truck_id]))
        self.env.run(until=self.grace_end_s)
        return self.log.events

    def _payload(
        self,
        truck: dict[str, Any],
        shovel: dict[str, Any],
        front: dict[str, Any],
        route: dict[str, Any],
        cycle_id: str | None,
    ) -> dict[str, Any]:
        return {
            "cycleId": cycle_id,
            "truckId": truck["id"],
            "shovelId": shovel["id"],
            "frontId": front["id"],
            "destinationId": front["destination_id"],
            "routeId": route["id"],
            "material": front["material"],
        }

    def _maybe_downtime(
        self,
        truck: dict[str, Any],
        cycle_number: int,
        payload: dict[str, Any],
    ):
        """Yield a technical downtime block at a cycle boundary, if configured."""
        if not self.downtime or self.downtime_done:
            return
        if truck["id"] != self.downtime["truck_id"]:
            return
        if cycle_number != int(self.downtime.get("after_cycles", 2)) + 1:
            return
        if self.env.now + self.downtime_s > self.shift_end_s:
            return

        self.downtime_done = True
        reason = self.downtime.get("reason", "technical")
        down_payload = dict(payload)
        down_payload.update(
            {
                "cycleId": None,
                "unavailabilityId": f"UNAV-{truck['id']}-001",
                "reason": reason,
                "durationMin": round(self.downtime_s / 60.0, 1),
            }
        )
        self.log.emit("truck.down", truck["id"], self.env.now, down_payload)
        yield self.env.timeout(self.downtime_s)
        up_payload = dict(down_payload)
        up_payload.pop("durationMin", None)
        self.log.emit("truck.up", truck["id"], self.env.now, up_payload)

    def truck_process(self, truck: dict[str, Any]):
        """Generate cycles for one truck until the shift ends."""
        truck_id = truck["id"]
        shovel = self.shovels[truck["shovel_id"]]
        front = self.fronts[shovel["front_id"]]
        route = self.routes[front["route_id"]]
        destination = self.destinations[front["destination_id"]]
        rng = random.Random(f"{self.seed}:{truck_id}")
        payload_base = self._payload(truck, shovel, front, route, None)

        self.log.emit(
            "truck.idle",
            truck_id,
            0.0,
            {**payload_base, "cycleId": None},
        )

        cycle_number = 0
        while self.env.now < self.shift_end_s:
            cycle_number += 1
            cycle_id = f"{truck_id}-C{cycle_number:03d}"
            payload = self._payload(truck, shovel, front, route, cycle_id)

            yield from self._maybe_downtime(truck, cycle_number, payload)

            # Queue and loading at the assigned shovel.
            self.log.emit(
                "truck.queued",
                truck_id,
                self.env.now,
                {**payload, "queueId": f"{shovel['id']}-QUEUE"},
            )
            with self.shovel_resources[shovel["id"]].request() as request:
                yield request
                self.log.emit("truck.loading_started", truck_id, self.env.now, payload)
                loading_s = triangular_minutes(
                    shovel["loading_time_min"], self.shovel_rng[shovel["id"]]
                )
                yield self.env.timeout(loading_s)
                load_tons = round(
                    float(truck["capacity_t"]) * rng.uniform(0.95, 1.0), 1
                )
                self.log.emit(
                    "truck.loaded",
                    truck_id,
                    self.env.now,
                    {**payload, "tons": load_tons},
                )

            # Haul to the destination.
            self.log.emit("truck.hauling_started", truck_id, self.env.now, payload)
            haul_s = triangular_minutes(route["travel_time_min"], rng)
            yield self.env.timeout(haul_s)
            self.log.emit(
                "truck.arrived_at_destination",
                truck_id,
                self.env.now,
                {**payload, "destinationId": destination["id"]},
            )

            # Destination queue and dump.
            with self.destination_resources[destination["id"]].request() as request:
                yield request
                self.log.emit("truck.dumping_started", truck_id, self.env.now, payload)
                dump_s = triangular_minutes(
                    destination["service_time_min"],
                    self.destination_rng[destination["id"]],
                )
                yield self.env.timeout(dump_s)
                self.log.emit(
                    "truck.dumped",
                    truck_id,
                    self.env.now,
                    {**payload, "tons": load_tons},
                )

            # Return to the shovel assignment.
            self.log.emit("truck.returning", truck_id, self.env.now, payload)
            return_s = triangular_minutes(route["return_time_min"], rng)
            yield self.env.timeout(return_s)
            self.log.emit("truck.idle", truck_id, self.env.now, payload)
