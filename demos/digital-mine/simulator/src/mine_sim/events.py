"""Event envelope and writers for the synthetic dataset."""

from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path
from typing import Any

from .config import iso_at


EVENT_VERSION = 1


class EventLog:
    """Collects deterministic domain events for one simulation run."""

    def __init__(
        self,
        *,
        run_id: str,
        shift_id: str,
        site_id: str,
        simulated_epoch: datetime,
        real_epoch: datetime,
    ) -> None:
        self.run_id = run_id
        self.shift_id = shift_id
        self.site_id = site_id
        self.simulated_epoch = simulated_epoch
        self.real_epoch = real_epoch
        self.events: list[dict[str, Any]] = []
        self._seq: dict[str, int] = {}

    def emit(
        self,
        event_type: str,
        truck_id: str,
        occurred_s: float,
        payload: dict[str, Any],
    ) -> dict[str, Any]:
        """Append one event and return it."""
        seq = self._seq.get(truck_id, 0) + 1
        self._seq[truck_id] = seq
        event_id = f"{self.run_id}-{truck_id}-{seq:04d}"
        event = {
            "eventId": event_id,
            "eventType": event_type,
            "eventVersion": EVENT_VERSION,
            "runId": self.run_id,
            "shiftId": self.shift_id,
            "seq": seq,
            "streamId": truck_id,
            "occurredAt": iso_at(self.simulated_epoch, occurred_s),
            "sentAt": iso_at(self.real_epoch, occurred_s),
            "receivedAt": iso_at(self.real_epoch, occurred_s),
            "siteId": self.site_id,
            "source": "simulator",
            "simulated": True,
            "quality": "good",
            "duplicate": False,
            "outageId": None,
            "payload": payload,
        }
        self.events.append(event)
        return event


def sort_events(events: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Return events in canonical ``(occurredAt, streamId, seq)`` order."""
    return sorted(
        events,
        key=lambda event: (
            event["occurredAt"],
            event["streamId"],
            int(event["seq"]),
        ),
    )


def write_jsonl(path: str | Path, events: list[dict[str, Any]]) -> None:
    """Write events as UTF-8 JSON Lines."""
    output = Path(path)
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open("w", encoding="utf-8") as handle:
        for event in events:
            handle.write(json.dumps(event, ensure_ascii=False, sort_keys=True))
            handle.write("\n")


def parse_event_time(value: str) -> datetime:
    """Parse an event timestamp normalized by ``iso_at``."""
    return datetime.fromisoformat(value.replace("Z", "+00:00"))
