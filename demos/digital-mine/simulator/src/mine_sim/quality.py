"""Apply a dispatch-server outage and summarize data quality."""

from __future__ import annotations

import copy
import json
import random
from pathlib import Path
from typing import Any

from .config import iso_at, minutes, parse_epoch
from .events import parse_event_time


def apply_dispatch_outage(
    events: list[dict[str, Any]],
    config: dict[str, Any],
    seed: int,
) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    """Degrade received events during the configured outage window.

    Ground truth events are copied. The returned list represents what the
    dispatch server received, including gaps, late arrivals, duplicates and
    incomplete payloads.
    """
    outage = config.get("disruptions", {}).get("dispatch_outage")
    if not outage:
        return [copy.deepcopy(event) for event in events], {}

    shift = config["shift"]
    simulated_epoch = parse_epoch(shift["simulated_epoch"])
    real_epoch = parse_epoch(shift["real_epoch"])
    start_s = minutes(outage["start_min"])
    end_s = start_s + minutes(outage["duration_min"])
    outage_id = "OUT-001"
    delivery = outage["delivery"]
    delay_spec = outage.get("late_delay_min", {"low": 5, "high": 25})
    rng = random.Random(f"{seed}:outage")

    received: list[dict[str, Any]] = []
    for ground_event in events:
        event_s = (
            parse_event_time(ground_event["occurredAt"]) - simulated_epoch
        ).total_seconds()
        event = copy.deepcopy(ground_event)

        if not (start_s <= event_s < end_s):
            received.append(event)
            continue

        roll = rng.random()
        drop_limit = delivery["drop"]
        late_limit = drop_limit + delivery["late"]
        duplicate_limit = late_limit + delivery["duplicate"]
        incomplete_limit = duplicate_limit + delivery["incomplete"]

        if roll < drop_limit:
            continue

        if roll < late_limit:
            event["quality"] = "late"
            event["outageId"] = outage_id
            event["receivedAt"] = iso_at(
                real_epoch,
                end_s + rng.uniform(delay_spec["low"], delay_spec["high"]) * 60.0,
            )
            received.append(event)
            continue

        if roll < duplicate_limit:
            event["quality"] = "late"
            event["outageId"] = outage_id
            late_at = end_s + rng.uniform(
                delay_spec["low"], delay_spec["high"]
            ) * 60.0
            event["receivedAt"] = iso_at(real_epoch, late_at)
            received.append(event)

            duplicate = copy.deepcopy(event)
            duplicate["quality"] = "duplicate"
            duplicate["duplicate"] = True
            duplicate["receivedAt"] = iso_at(real_epoch, late_at + 1.0)
            received.append(duplicate)
            continue

        if roll < incomplete_limit:
            event["quality"] = "incomplete"
            event["outageId"] = outage_id
            event["receivedAt"] = iso_at(
                real_epoch,
                end_s + rng.uniform(1.0, 5.0) * 60.0,
            )
            event["payload"].pop("tons", None)
            event["payload"].pop("material", None)
            received.append(event)
            continue

        # Intermittent delivery: a small fraction arrives on time.
        event["quality"] = "good"
        event["outageId"] = outage_id
        event["receivedAt"] = event["sentAt"]
        received.append(event)

    return received, {
        "outageId": outage_id,
        "startMin": outage["start_min"],
        "durationMin": outage["duration_min"],
        "endMin": outage["start_min"] + outage["duration_min"],
        "cause": outage["cause"],
        "delivery": delivery,
    }


def summarize_quality(
    ground_truth: list[dict[str, Any]],
    received: list[dict[str, Any]],
    ground_cycles: list[dict[str, Any]],
    received_cycles: list[dict[str, Any]],
    config: dict[str, Any],
    outage: dict[str, Any],
) -> dict[str, Any]:
    """Build a compact data-quality report."""
    expected = len(ground_truth)
    unique_received: dict[str, dict[str, Any]] = {}
    for event in received:
        unique_received.setdefault(event["eventId"], event)

    quality_counts = {"good": 0, "late": 0, "duplicate": 0, "incomplete": 0}
    for event in received:
        quality_counts[event["quality"]] = quality_counts.get(event["quality"], 0) + 1

    expected_by_type: dict[str, int] = {}
    received_by_type: dict[str, int] = {}
    for event in ground_truth:
        expected_by_type[event["eventType"]] = expected_by_type.get(event["eventType"], 0) + 1
    for event in unique_received.values():
        received_by_type[event["eventType"]] = received_by_type.get(event["eventType"], 0) + 1

    ground_ids = {cycle["cycle_id"] for cycle in ground_cycles}
    received_ids = {cycle["cycle_id"] for cycle in received_cycles}
    missing_cycles = sorted(ground_ids - received_ids)

    if outage:
        simulated_epoch = parse_epoch(config["shift"]["simulated_epoch"])
        start_s = minutes(outage["startMin"])
        end_s = start_s + minutes(outage["durationMin"])

        def in_outage(event: dict[str, Any]) -> bool:
            event_s = (
                parse_event_time(event["occurredAt"]) - simulated_epoch
            ).total_seconds()
            return start_s <= event_s < end_s

        outage_expected = [event for event in ground_truth if in_outage(event)]
        outage_received = [
            event for event in unique_received.values() if in_outage(event)
        ]
        outage_rows = [event for event in received if in_outage(event)]
        outage_quality: dict[str, int] = {}
        for event in outage_rows:
            quality = event["quality"]
            outage_quality[quality] = outage_quality.get(quality, 0) + 1
        outage["events"] = {
            "expected": len(outage_expected),
            "receivedRows": len(outage_rows),
            "receivedUnique": len(outage_received),
            "missing": len(outage_expected) - len(outage_received),
            "coveragePct": round(
                100.0 * len(outage_received) / len(outage_expected), 2
            )
            if outage_expected
            else 0.0,
            "qualityCounts": outage_quality,
        }

    downtime = config.get("disruptions", {}).get("truck_downtime")
    downtime_summary = None
    if downtime:
        downtime_summary = {
            "truckId": downtime["truck_id"],
            "fractionOfShift": downtime["fraction_of_shift"],
            "durationMin": round(
                float(downtime["fraction_of_shift"])
                * float(config["shift"]["duration_min"]),
                1,
            ),
            "reason": downtime.get("reason", "technical"),
            "maintenanceRecords": False,
        }

    return {
        "simulated": True,
        "outage": outage,
        "events": {
            "expected": expected,
            "receivedRows": len(received),
            "receivedUnique": len(unique_received),
            "missing": expected - len(unique_received),
            "coveragePct": round(
                100.0 * len(unique_received) / expected, 2
            )
            if expected
            else 0.0,
            "qualityCounts": quality_counts,
            "expectedByType": expected_by_type,
            "receivedByType": received_by_type,
        },
        "cycles": {
            "groundTruth": len(ground_cycles),
            "received": len(received_cycles),
            "complete": sum(1 for cycle in received_cycles if cycle["quality"] == "complete"),
            "partial": sum(1 for cycle in received_cycles if cycle["quality"] == "partial"),
            "missing": len(missing_cycles),
            "missingIds": missing_cycles,
        },
        "truckDowntime": downtime_summary,
    }


def write_json(path: str | Path, payload: dict[str, Any]) -> None:
    """Write a JSON document with stable formatting."""
    output = Path(path)
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2, sort_keys=True)
        handle.write("\n")
