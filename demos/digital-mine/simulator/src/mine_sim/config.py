"""Configuration helpers for the Digital Mine synthetic data generator."""

from __future__ import annotations

import json
import random
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any


def load_config(path: str | Path) -> dict[str, Any]:
    """Load and minimally validate a JSON configuration file."""
    config_path = Path(path)
    with config_path.open("r", encoding="utf-8") as handle:
        config = json.load(handle)

    required = ["site_id", "run_id", "shift", "fleet", "fronts", "destinations", "routes"]
    missing = [key for key in required if key not in config]
    if missing:
        raise ValueError(f"Missing configuration keys: {', '.join(missing)}")

    if not config["fleet"].get("trucks"):
        raise ValueError("The fleet must include at least one truck.")
    if not config["fleet"].get("shovels"):
        raise ValueError("The fleet must include at least one shovel.")

    return config


def parse_epoch(value: str) -> datetime:
    """Parse an ISO 8601 timestamp and normalize it to UTC."""
    normalized = value.replace("Z", "+00:00")
    parsed = datetime.fromisoformat(normalized)
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def iso_at(epoch: datetime, seconds: float) -> str:
    """Return an ISO 8601 UTC timestamp at ``epoch + seconds``."""
    moment = epoch + timedelta(seconds=float(seconds))
    return moment.isoformat(timespec="seconds").replace("+00:00", "Z")


def triangular_minutes(spec: dict[str, float], rng: random.Random) -> float:
    """Draw a triangular sample expressed in minutes and return seconds."""
    low = float(spec["low"])
    mode = float(spec["mode"])
    high = float(spec["high"])
    if not (low <= mode <= high):
        raise ValueError(f"Invalid triangular distribution: {spec}")
    return rng.triangular(low, high, mode) * 60.0


def minutes(value: float) -> float:
    """Convert minutes to seconds."""
    return float(value) * 60.0


def index_by(items: list[dict[str, Any]], key: str) -> dict[str, dict[str, Any]]:
    """Index a list of dictionaries by one of their fields."""
    return {item[key]: item for item in items}
