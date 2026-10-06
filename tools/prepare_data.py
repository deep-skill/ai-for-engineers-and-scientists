"""Archive a small, reproducible set of public data for the teaching demos."""

from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen
import hashlib
import json

ROOT = Path(__file__).resolve().parents[1]
CITIES = {
    "lima": {"name": "Lima", "latitude": -12.0464, "longitude": -77.0428},
    "arequipa": {"name": "Arequipa", "latitude": -16.4090, "longitude": -71.5375},
    "piura": {"name": "Piura", "latitude": -5.1945, "longitude": -80.6328},
}


def retrieve(url):
    request = Request(url, headers={"User-Agent": "DeepSkillTeaching/1.0"})
    with urlopen(request, timeout=50) as response:
        return response.read()


def fetch_city(item):
    slug, city = item
    params = {
        "parameters": "ALLSKY_SFC_SW_DWN", "community": "RE",
        "longitude": city["longitude"], "latitude": city["latitude"],
        "start": "20250101", "end": "20251231", "format": "JSON",
        "time-standard": "LST",
    }
    url = "https://power.larc.nasa.gov/api/temporal/daily/point?" + urlencode(params)
    raw = retrieve(url)
    payload = json.loads(raw)
    values = payload["properties"]["parameter"]["ALLSKY_SFC_SW_DWN"]
    if len(values) != 365:
        raise ValueError(f"{slug}: expected 365 daily records, found {len(values)}")
    units = payload["parameters"]["ALLSKY_SFC_SW_DWN"]["units"]
    if units != "kW-hr/m^2/day":
        raise ValueError(f"Unexpected units for {slug}: {units}")
    fill = payload["header"]["fill_value"]
    valid = [v for v in values.values() if v != fill and v is not None]
    if len(valid) != 365 or any(v < 0 for v in valid):
        raise ValueError(f"{slug}: incomplete or negative solar data")
    path = ROOT / "demos/solar/starter/data" / f"{slug}-2025.json"
    path.write_bytes(raw)
    return {
        **city, "slug": slug, "file": path.name, "url": url,
        "sha256": hashlib.sha256(raw).hexdigest(), "records": len(valid),
        "units": units, "annual_irradiation_kwh_m2": round(sum(valid), 3),
    }


def main():
    with ThreadPoolExecutor(max_workers=3) as pool:
        cities = list(pool.map(fetch_city, CITIES.items()))
    metadata = {
        "source": "NASA POWER", "retrieved_at": datetime.now(timezone.utc).isoformat(),
        "period": "2025-01-01/2025-12-31", "time_standard": "LST",
        "parameter": "ALLSKY_SFC_SW_DWN", "cities": cities,
        "documentation": "https://power.larc.nasa.gov/docs/tutorials/service-data-request/api/",
        "description": "Daily gridded all-sky solar irradiance on a horizontal surface. These are NASA POWER estimates, not local sensor measurements.",
    }
    solar_dir = ROOT / "demos/solar/starter/data"
    (solar_dir / "sources.json").write_text(json.dumps(metadata, indent=2, ensure_ascii=False) + "\n")
    quake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"
    raw = retrieve(quake_url)
    payload = json.loads(raw)
    quake_dir = ROOT / "demos/earthquakes/starter/data"
    (quake_dir / "usgs-m45-month.geojson").write_bytes(raw)
    (quake_dir / "sources.json").write_text(json.dumps({
        "source": "USGS", "url": quake_url,
        "retrieved_at": datetime.now(timezone.utc).isoformat(),
        "generated_at_ms": payload["metadata"]["generated"],
        "records": len(payload["features"]), "sha256": hashlib.sha256(raw).hexdigest(),
        "documentation": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
        "coordinates": "longitude, latitude, depth_km", "event_time": "Unix milliseconds UTC",
    }, indent=2, ensure_ascii=False) + "\n")
    print(json.dumps({"solar": [{"city": c["name"], "records": c["records"], "annual_kwh_m2": c["annual_irradiation_kwh_m2"]} for c in cities], "earthquakes": len(payload["features"])}, ensure_ascii=False))


if __name__ == "__main__":
    main()

