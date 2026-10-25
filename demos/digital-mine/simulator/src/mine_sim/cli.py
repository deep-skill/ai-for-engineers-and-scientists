"""Command-line entry point for synthetic dataset generation."""

from __future__ import annotations

import argparse
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from .config import load_config, minutes, parse_epoch
from .cycles import build_cycles, write_cycles_csv
from .events import sort_events, write_jsonl
from .model import MineSimulation
from .quality import apply_dispatch_outage, summarize_quality, write_json
from .validate import validate_dataset, write_validation


def _manifest(
    config: dict[str, Any],
    seed: int,
    ground_events: list[dict[str, Any]],
    received_events: list[dict[str, Any]],
    ground_cycles: list[dict[str, Any]],
    received_cycles: list[dict[str, Any]],
) -> dict[str, Any]:
    config_text = json.dumps(config, sort_keys=True, ensure_ascii=False)
    return {
        "schemaVersion": "0.1",
        "runId": config["run_id"],
        "shiftId": config["shift"]["id"],
        "seed": seed,
        "generatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "simulated": True,
        "source": "simulator",
        "notes": (
            "Synthetic data for Digital Mine. Not a measurement of a real mine. "
            "ground_truth/ is the complete simulation; events.jsonl and cycles.csv "
            "are the degraded data received during the dispatch-server outage."
        ),
        "configSha256": hashlib.sha256(config_text.encode("utf-8")).hexdigest(),
        "config": config,
        "counts": {
            "groundEvents": len(ground_events),
            "receivedEventRows": len(received_events),
            "receivedUniqueEvents": len({event["eventId"] for event in received_events}),
            "groundCycles": len(ground_cycles),
            "receivedCycles": len(received_cycles),
        },
        "files": {
            "receivedEvents": "events.jsonl",
            "receivedCycles": "cycles.csv",
            "groundTruthEvents": "ground_truth/events.jsonl",
            "groundTruthCycles": "ground_truth/cycles.csv",
            "dataQuality": "data_quality.json",
            "validation": "validation.json",
        },
    }


def generate(config_path: str, seed: int, output_dir: str) -> dict[str, Any]:
    config = load_config(config_path)
    simulation = MineSimulation(config, seed)
    ground_events = sort_events(simulation.run())

    shift = config["shift"]
    simulated_epoch = parse_epoch(shift["simulated_epoch"])
    shift_end_s = minutes(shift["duration_min"])

    ground_cycles = build_cycles(
        ground_events,
        simulated_epoch=simulated_epoch,
        shift_end_s=shift_end_s,
        ground_truth=True,
    )

    received_events, outage = apply_dispatch_outage(ground_events, config, seed)
    received_events = sort_events(received_events)
    received_cycles = build_cycles(
        received_events,
        simulated_epoch=simulated_epoch,
        shift_end_s=shift_end_s,
        ground_truth=False,
    )
    quality = summarize_quality(
        ground_events,
        received_events,
        ground_cycles,
        received_cycles,
        config,
        outage,
    )
    validation = validate_dataset(
        config=config,
        ground_events=ground_events,
        received_events=received_events,
        ground_cycles=ground_cycles,
        received_cycles=received_cycles,
        quality=quality,
    )

    output = Path(output_dir)
    output.mkdir(parents=True, exist_ok=True)
    (output / "ground_truth").mkdir(exist_ok=True)

    write_jsonl(output / "events.jsonl", received_events)
    write_jsonl(output / "ground_truth" / "events.jsonl", ground_events)
    write_cycles_csv(output / "cycles.csv", received_cycles)
    write_cycles_csv(output / "ground_truth" / "cycles.csv", ground_cycles)
    write_json(output / "data_quality.json", quality)
    write_json(output / "validation.json", validation)
    write_json(
        output / "manifest.json",
        _manifest(
            config,
            seed,
            ground_events,
            received_events,
            ground_cycles,
            received_cycles,
        ),
    )

    return {
        "output": str(output),
        "groundEvents": len(ground_events),
        "receivedRows": len(received_events),
        "groundCycles": len(ground_cycles),
        "receivedCycles": len(received_cycles),
        "validationPassed": validation["passed"],
        "quality": quality,
    }


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate synthetic loading and hauling data for Digital Mine."
    )
    parser.add_argument(
        "--config",
        default="config/shift-001.json",
        help="Path to the JSON configuration.",
    )
    parser.add_argument("--seed", type=int, default=42, help="Master random seed.")
    parser.add_argument(
        "--out",
        default="data/shift-001",
        help="Output directory for the dataset.",
    )
    args = parser.parse_args()
    result = generate(args.config, args.seed, args.out)
    print(json.dumps(result, ensure_ascii=False, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
