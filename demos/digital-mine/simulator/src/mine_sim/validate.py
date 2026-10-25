"""Validation checks for generated events and cycles."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .config import index_by, minutes
from .events import parse_event_time


def _check(name: str, passed: bool, detail: Any) -> dict[str, Any]:
    return {"name": name, "passed": bool(passed), "detail": detail}


def validate_dataset(
    *,
    config: dict[str, Any],
    ground_events: list[dict[str, Any]],
    received_events: list[dict[str, Any]],
    ground_cycles: list[dict[str, Any]],
    received_cycles: list[dict[str, Any]],
    quality: dict[str, Any],
) -> dict[str, Any]:
    """Run structural and domain checks over one generated dataset."""
    checks: list[dict[str, Any]] = []
    shift_end_s = minutes(config["shift"]["duration_min"])
    trucks = index_by(config["fleet"]["trucks"], "id")
    shovels = index_by(config["fleet"]["shovels"], "id")
    fronts = index_by(config["fronts"], "id")
    destinations = index_by(config["destinations"], "id")

    required_event_fields = {
        "eventId",
        "eventType",
        "eventVersion",
        "runId",
        "shiftId",
        "seq",
        "streamId",
        "occurredAt",
        "sentAt",
        "receivedAt",
        "siteId",
        "source",
        "simulated",
        "quality",
        "duplicate",
        "outageId",
        "payload",
    }
    schema_ok = all(required_event_fields <= set(event) for event in ground_events)
    checks.append(_check("event_schema", schema_ok, len(ground_events)))

    # Sequence is monotonic per truck and timestamps do not go backwards.
    seq_ok = True
    time_ok = True
    last_seq: dict[str, int] = {}
    last_time: dict[str, Any] = {}
    for event in ground_events:
        truck_id = event["streamId"]
        if event["seq"] <= last_seq.get(truck_id, 0):
            seq_ok = False
        last_seq[truck_id] = event["seq"]
        moment = parse_event_time(event["occurredAt"])
        if truck_id in last_time and moment < last_time[truck_id]:
            time_ok = False
        last_time[truck_id] = moment
    checks.append(_check("event_sequence", seq_ok, "seq monotonic per truck"))
    checks.append(_check("event_time_order", time_ok, "occurredAt non-decreasing per truck"))

    # Ground-truth state machine.
    allowed = {
        ("idle", "truck.idle"): "idle",
        ("idle", "truck.down"): "down",
        ("down", "truck.up"): "idle",
        ("idle", "truck.queued"): "queued",
        ("queued", "truck.loading_started"): "loading",
        ("loading", "truck.loaded"): "loaded",
        ("loaded", "truck.hauling_started"): "hauling",
        ("hauling", "truck.arrived_at_destination"): "at_destination",
        ("at_destination", "truck.dumping_started"): "dumping",
        ("dumping", "truck.dumped"): "dumped",
        ("dumped", "truck.returning"): "returning",
        ("returning", "truck.idle"): "idle",
    }
    states = {truck_id: "idle" for truck_id in trucks}
    violations: list[str] = []
    for event in sorted(ground_events, key=lambda item: (item["streamId"], item["seq"])):
        truck_id = event["streamId"]
        key = (states[truck_id], event["eventType"])
        if key not in allowed:
            violations.append(f"{truck_id}: {states[truck_id]} -> {event['eventType']}")
            continue
        states[truck_id] = allowed[key]
    checks.append(_check("truck_state_machine", not violations, violations[:20]))

    # Mass balance from ground-truth events.
    loaded_tons = sum(
        float(event["payload"].get("tons", 0))
        for event in ground_events
        if event["eventType"] == "truck.loaded"
    )
    dumped_tons = sum(
        float(event["payload"].get("tons", 0))
        for event in ground_events
        if event["eventType"] == "truck.dumped"
    )
    checks.append(
        _check(
            "mass_balance",
            abs(loaded_tons - dumped_tons) < 0.01,
            {"loadedT": round(loaded_tons, 1), "dumpedT": round(dumped_tons, 1)},
        )
    )

    # Capacity and references.
    capacity_ok = True
    reference_ok = True
    for event in ground_events:
        if event["eventType"] not in {"truck.loaded", "truck.dumped"}:
            continue
        payload = event["payload"]
        truck_id = payload.get("truckId")
        if truck_id not in trucks:
            reference_ok = False
            continue
        if float(payload.get("tons", 0)) > float(trucks[truck_id]["capacity_t"]) + 0.01:
            capacity_ok = False
        if payload.get("shovelId") not in shovels:
            reference_ok = False
        if payload.get("frontId") not in fronts:
            reference_ok = False
        if payload.get("destinationId") not in destinations:
            reference_ok = False
    checks.append(_check("truck_capacity", capacity_ok, "tons <= capacity"))
    checks.append(_check("references", reference_ok, "truck/shovel/front/destination"))

    # Cycles: non-negative durations and complete ground truth.
    negative = []
    for cycle in ground_cycles + received_cycles:
        for field in [
            "queue_time_s",
            "loading_time_s",
            "haul_time_s",
            "dump_time_s",
            "return_time_s",
            "cycle_time_s",
            "waiting_time_s",
        ]:
            value = cycle.get(field)
            if value is not None and value < 0:
                negative.append(f"{cycle['cycle_id']}:{field}={value}")
    checks.append(_check("non_negative_durations", not negative, negative[:20]))

    ground_complete = all(cycle["quality"] == "complete" for cycle in ground_cycles)
    checks.append(
        _check(
            "ground_cycles_complete",
            ground_complete,
            {"cycles": len(ground_cycles)},
        )
    )

    # Disruptions.
    downtime_events = [
        event for event in ground_events if event["eventType"] == "truck.down"
    ]
    downtime_ok = False
    downtime_detail: dict[str, Any] = {"events": len(downtime_events)}
    if downtime_events:
        event = downtime_events[0]
        duration_min = float(event["payload"].get("durationMin", 0))
        expected_min = (
            float(config["disruptions"]["truck_downtime"]["fraction_of_shift"])
            * float(config["shift"]["duration_min"])
        )
        downtime_ok = abs(duration_min - expected_min) <= 1.0
        downtime_detail.update(
            {
                "truck": event["payload"].get("truckId"),
                "durationMin": duration_min,
                "expectedMin": expected_min,
            }
        )
    checks.append(_check("truck_downtime_5pct", downtime_ok, downtime_detail))

    outage_ok = False
    outage_detail: dict[str, Any] = {}
    if quality.get("outage"):
        outage = quality["outage"]
        outage_ok = abs(float(outage["durationMin"]) - 30.0) <= 1.0
        outage_detail = {
            "durationMin": outage["durationMin"],
            "cause": outage["cause"],
            "missingEvents": quality["events"]["missing"],
            "late": quality["events"]["qualityCounts"].get("late", 0),
            "duplicates": quality["events"]["qualityCounts"].get("duplicate", 0),
            "incomplete": quality["events"]["qualityCounts"].get("incomplete", 0),
        }
    checks.append(_check("dispatch_outage_30min", outage_ok, outage_detail))

    # No maintenance records: only operational truck.down/up events.
    maintenance_types = {
        event["eventType"]
        for event in ground_events
        if "maintenance" in event["eventType"].lower()
        or "work_order" in event["eventType"].lower()
    }
    checks.append(_check("no_maintenance_records", not maintenance_types, sorted(maintenance_types)))

    # Received data must show degradation, not a perfect copy.
    degraded = (
        quality["events"]["missing"] > 0
        and quality["events"]["qualityCounts"].get("late", 0) > 0
        and quality["events"]["qualityCounts"].get("duplicate", 0) > 0
        and quality["events"]["qualityCounts"].get("incomplete", 0) > 0
    )
    checks.append(_check("received_data_degraded", degraded, quality["events"]))

    passed = all(check["passed"] for check in checks)
    return {
        "simulated": True,
        "passed": passed,
        "checks": checks,
        "summary": {
            "groundEvents": len(ground_events),
            "receivedRows": len(received_events),
            "groundCycles": len(ground_cycles),
            "receivedCycles": len(received_cycles),
            "loadedTons": round(loaded_tons, 1),
            "dumpedTons": round(dumped_tons, 1),
        },
    }


def write_validation(path: str | Path, validation: dict[str, Any]) -> None:
    output = Path(path)
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open("w", encoding="utf-8") as handle:
        json.dump(validation, handle, ensure_ascii=False, indent=2, sort_keys=True)
        handle.write("\n")
