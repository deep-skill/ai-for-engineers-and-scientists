from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from mine_sim.cli import generate

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / "config" / "shift-001.json"


class GenerationTests(unittest.TestCase):
    def test_same_seed_is_deterministic(self) -> None:
        with tempfile.TemporaryDirectory() as first, tempfile.TemporaryDirectory() as second:
            first_result = generate(str(CONFIG), 42, first)
            second_result = generate(str(CONFIG), 42, second)

            for relative in [
                "events.jsonl",
                "cycles.csv",
                "ground_truth/events.jsonl",
                "ground_truth/cycles.csv",
            ]:
                self.assertEqual(
                    (Path(first) / relative).read_text(encoding="utf-8"),
                    (Path(second) / relative).read_text(encoding="utf-8"),
                    relative,
                )

            self.assertTrue(first_result["validationPassed"])
            self.assertTrue(second_result["validationPassed"])

    def test_disruptions_are_visible(self) -> None:
        with tempfile.TemporaryDirectory() as output:
            result = generate(str(CONFIG), 42, output)
            quality = result["quality"]

            self.assertTrue(result["validationPassed"])
            self.assertEqual(quality["truckDowntime"]["durationMin"], 24.0)
            self.assertFalse(quality["truckDowntime"]["maintenanceRecords"])
            self.assertEqual(quality["outage"]["durationMin"], 30)
            self.assertLessEqual(
                quality["outage"]["events"]["coveragePct"], 60.0
            )
            self.assertGreater(quality["outage"]["events"]["missing"], 0)
            self.assertGreater(
                quality["outage"]["events"]["qualityCounts"].get("late", 0), 0
            )
            self.assertGreater(
                quality["outage"]["events"]["qualityCounts"].get("duplicate", 0), 0
            )
            self.assertGreater(
                quality["outage"]["events"]["qualityCounts"].get("incomplete", 0), 0
            )
            self.assertGreater(quality["cycles"]["partial"], 0)


if __name__ == "__main__":
    unittest.main()
