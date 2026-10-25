"""Project loading/hauling cycles from domain events."""

from __future__ import annotations

import csv
from datetime import datetime
from pathlib import Path
from typing import Any

from .events import parse_event_time

REQUIRED_EVENTS = [
    "truck.queued",
    "truck.loading_started",
    "truck.loaded",
    "truck.hauling_started",
    "truck.arrived_at_destination",
    "truck.dumping_started",
    "truck.dumped",
    "truck.returning",
    "truck.idle",
]

CYCLE_FIELDS = [
    "cycle_id",
    "run_id",
    "shift_id",
    "truck_id",
    "shovel_id",
    "front_id",
    "destination_id",
    "material",
    "load_tons",
    "queue_start",
    "loading_start",
    "loading_end",
    "haul_start",
    "arrive_destination",
    "dump_start",
    "dump_end",
    "return_start",
    "return_end",
    "queue_time_s",
    "loading_time_s",
    "haul_time_s",
    "dump_time_s",
    "return_time_s",
    "cycle_time_s",
    "waiting_time_s",
    "quality",
    "outage_id",
    "data_coverage",
    "ends_after_shift",
]


def _dedupe(events: list[dict[str, Any]]) -> list[dict[str, Any]]:
    unique: dict[str, dict[str, Any]] = {}
    for event in events:
        unique.setdefault(event["eventId"], event)
    return list(unique.values())


def _event_seconds(event: dict[str, Any], epoch: datetime) -> float:
    return (parse_event_time(event["occurredAt"]) - epoch).total_seconds()


def _first(events: list[dict[str, Any]], event_type: str) -> dict[str, Any] | None:
    for event in events:
        if event["eventType"] == event_type:
            return event
    return None


def _value(event: dict[str, Any] | None, key: str) -> Any:
    return event["payload"].get(key) if event else None


def build_cycles(
    events: list[dict[str, Any]],
    *,
    simulated_epoch: datetime,
    shift_end_s: float,
    ground_truth: bool = False,
) -> list[dict[str, Any]]:
    """Group events by ``cycleId`` and derive one row per observable cycle."""
    source = events if ground_truth else _dedupe(events)
    grouped: dict[str, list[dict[str, Any]]] = {}
    for event in source:
        cycle_id = event.get("payload", {}).get("cycleId")
        if cycle_id:
            grouped.setdefault(cycle_id, []).append(event)

    cycles: list[dict[str, Any]] = []
    for cycle_id in sorted(grouped):
        group = sorted(grouped[cycle_id], key=lambda item: item["seq"])
        first_event = group[0]
        by_type = {event_type: _first(group, event_type) for event_type in REQUIRED_EVENTS}
        present = [event_type for event_type, event in by_type.items() if event]

        payload_source = by_type["truck.queued"] or first_event
        payload = payload_source["payload"]
        truck_id = payload.get("truckId") or cycle_id.split("-C", 1)[0]
        load_event = by_type["truck.loaded"]
        dump_event = by_type["truck.dumped"]
        load_tons = _value(load_event, "tons")
        if load_tons is None:
            load_tons = _value(dump_event, "tons")
        material = (
            payload.get("material")
            or _value(load_event, "material")
            or _value(dump_event, "material")
        )

        def time_of(event_type: str) -> float | None:
            event = by_type[event_type]
            return _event_seconds(event, simulated_epoch) if event else None

        queue_start = time_of("truck.queued")
        loading_start = time_of("truck.loading_started")
        loading_end = time_of("truck.loaded")
        haul_start = time_of("truck.hauling_started")
        arrive_destination = time_of("truck.arrived_at_destination")
        dump_start = time_of("truck.dumping_started")
        dump_end = time_of("truck.dumped")
        return_start = time_of("truck.returning")
        return_end = time_of("truck.idle")

        shovel_queue = (
            loading_start - queue_start
            if loading_start is not None and queue_start is not None
            else None
        )
        destination_queue = (
            dump_start - arrive_destination
            if dump_start is not None and arrive_destination is not None
            else None
        )
        if shovel_queue is None and destination_queue is None:
            queue_time = None
        else:
            queue_time = (shovel_queue or 0.0) + (destination_queue or 0.0)

        def duration(start: float | None, end: float | None) -> float | None:
            if start is None or end is None:
                return None
            return round(end - start, 1)

        coverage = round(100.0 * len(present) / len(REQUIRED_EVENTS), 1)
        complete = len(present) == len(REQUIRED_EVENTS) and load_tons is not None
        quality = "complete" if complete or ground_truth else "partial"
        outage_id = next(
            (event.get("outageId") for event in group if event.get("outageId")),
            None,
        )

        cycles.append(
            {
                "cycle_id": cycle_id,
                "run_id": first_event["runId"],
                "shift_id": first_event["shiftId"],
                "truck_id": truck_id,
                "shovel_id": payload.get("shovelId"),
                "front_id": payload.get("frontId"),
                "destination_id": payload.get("destinationId")
                or _value(by_type["truck.arrived_at_destination"], "destinationId"),
                "material": material,
                "load_tons": load_tons,
                "queue_start": None if queue_start is None else round(queue_start, 1),
                "loading_start": None
                if loading_start is None
                else round(loading_start, 1),
                "loading_end": None if loading_end is None else round(loading_end, 1),
                "haul_start": None if haul_start is None else round(haul_start, 1),
                "arrive_destination": None
                if arrive_destination is None
                else round(arrive_destination, 1),
                "dump_start": None if dump_start is None else round(dump_start, 1),
                "dump_end": None if dump_end is None else round(dump_end, 1),
                "return_start": None
                if return_start is None
                else round(return_start, 1),
                "return_end": None if return_end is None else round(return_end, 1),
                "queue_time_s": None if queue_time is None else round(queue_time, 1),
                "loading_time_s": duration(loading_start, loading_end),
                "haul_time_s": duration(haul_start, arrive_destination),
                "dump_time_s": duration(dump_start, dump_end),
                "return_time_s": duration(return_start, return_end),
                "cycle_time_s": duration(queue_start, return_end),
                "waiting_time_s": None if queue_time is None else round(queue_time, 1),
                "quality": quality,
                "outage_id": outage_id,
                "data_coverage": coverage,
                "ends_after_shift": bool(
                    return_end is not None and return_end > shift_end_s
                ),
            }
        )

    return cycles


def write_cycles_csv(path: str | Path, cycles: list[dict[str, Any]]) -> None:
    """Write cycles with a stable column order."""
    output = Path(path)
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=CYCLE_FIELDS, lineterminator="\n")
        writer.writeheader()
        for cycle in cycles:
            writer.writerow(
                {
                    field: "" if cycle.get(field) is None else cycle.get(field)
                    for field in CYCLE_FIELDS
                }
            )
