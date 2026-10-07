"""Package student workspaces with their original data and provenance."""
from pathlib import Path
import hashlib
import json
import zipfile

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "downloads"
OUT.mkdir(exist_ok=True)
packages = []
for demo in ("solar", "earthquakes"):
    starter = ROOT / "demos" / demo / "starter"
    files = [starter / "BRIEF.md", *sorted((starter / "data").glob("*"))]
    destination = OUT / f"{demo}-starter.zip"
    with zipfile.ZipFile(destination, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for path in files:
            if not path.is_file():
                continue
            name = f"{demo}-starter/{path.relative_to(starter).as_posix()}"
            info = zipfile.ZipInfo(name, date_time=(2025, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            archive.writestr(info, path.read_bytes())
    data = destination.read_bytes()
    packages.append({"demo": demo, "file": destination.name, "bytes": len(data),
                     "sha256": hashlib.sha256(data).hexdigest(),
                     "contents": [str(p.relative_to(starter)) for p in files if p.is_file()]})
(OUT / "manifest.json").write_text(json.dumps({"packages": packages}, indent=2) + "\n")
print("Packaged:", ", ".join(p["file"] for p in packages))
