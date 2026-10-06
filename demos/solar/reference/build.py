"""Build a self-contained educational solar calculator from archived NASA data."""
from pathlib import Path
from datetime import datetime, timezone
import argparse
import hashlib
import json
import math
import pandas as pd
import requests
from plotly.offline import get_plotlyjs

ROOT = Path(__file__).resolve().parents[3]
DATA = ROOT / "demos/solar/starter/data"
OUTPUT = Path(__file__).resolve().parent / "output"

HTML = r"""<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Calculadora solar · NASA POWER · DeepSkill</title><link rel="icon" href="../../../../assets/deepskill.png"><link rel="stylesheet" href="../../../../assets/brand.css"><style>
main{max-width:1360px;margin:auto;padding:35px 40px 65px}header{display:flex;justify-content:space-between;align-items:center}header>a:last-child{font-size:14px}h1{font-size:clamp(38px,5vw,66px);letter-spacing:-2.6px;line-height:1.08;margin:45px 0 18px}.intro{font-size:20px;line-height:1.6;color:var(--muted);max-width:870px}.source-tag{font-size:13px;color:var(--blue);letter-spacing:1px;text-transform:uppercase}.controls-grid{display:grid;grid-template-columns:1fr 1.3fr 1fr 1fr;gap:30px;padding:30px 0;border-block:1px solid var(--border);margin:30px 0}label{font-size:14px;color:var(--muted)}select,input[type=number]{width:100%;display:block;margin-top:12px;padding:12px;border:1px solid var(--border);border-radius:7px;color:white;background:var(--surface)}input[type=range]{width:100%;display:block;margin-top:23px;accent-color:var(--green)}label strong{color:white;font-size:18px}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:28px;margin:35px 0}.stat{border-left:2px solid var(--blue);padding-left:20px}.stat span{display:block;color:var(--muted);font-size:14px;margin-bottom:10px}.stat strong{font-size:37px;letter-spacing:-1.2px}.stat small{display:block;color:var(--muted);font-size:13px;margin-top:7px}.chart-head{display:flex;justify-content:space-between;gap:25px;align-items:center}.chart-head h2{font-size:27px;letter-spacing:-.7px}.compare{display:flex;gap:10px;align-items:center;font-size:15px;color:var(--muted)}input[type=checkbox]{accent-color:var(--green)}#chart{height:430px;width:100%}.table-wrap{overflow:auto;margin-top:30px}table{width:100%;border-collapse:collapse;font-size:14px}th{text-align:left;color:var(--muted);font-weight:500;padding:15px 12px;border-bottom:1px solid var(--border)}td{padding:13px 12px;border-bottom:1px solid var(--border)}.methods{margin-top:35px;border-top:1px solid var(--border);padding-top:20px;font-size:14px;line-height:1.7;color:var(--muted)}summary{color:white;cursor:pointer;font-size:17px}.methods code{color:var(--green)}.download{font-size:14px;border:1px solid var(--border);border-radius:7px;padding:12px 20px;background:var(--surface);color:white;margin-top:20px}.notes{max-width:1060px}.footer{margin-top:28px;font-size:12px;color:var(--muted)}@media(max-width:900px){.controls-grid,.stats{grid-template-columns:1fr 1fr}.chart-head{align-items:flex-start;flex-direction:column;gap:0}}@media(max-width:520px){main{padding:25px 20px}.controls-grid,.stats{gap:25px 20px}.stat strong{font-size:28px}.chart-head h2{font-size:23px}header>a:last-child{display:none}#chart{height:350px}}
</style><script>__PLOTLY__</script></head><body><main><header><a class="brand" href="../../../../index.html"><img src="../../../../assets/deepskill.png" alt="">DeepSkill</a><a href="https://power.larc.nasa.gov/docs/tutorials/service-data-request/api/" target="_blank" rel="noopener noreferrer">Fuente NASA POWER ↗</a></header><h1>Una demanda.<br>Tres <span class="gradient">recursos solares.</span></h1><p class="intro">Compara la producción estimada en Lima, Arequipa y Piura. Cambia la potencia, la demanda y el rendimiento para explorar una primera aproximación con datos públicos.</p><p class="source-tag">NASA POWER · Año 2025 · 1.095 registros diarios</p><section class="controls-grid" aria-label="Parámetros de la calculadora"><label>Ciudad<select id="city"><option value="lima">Lima</option><option value="arequipa">Arequipa</option><option value="piura">Piura</option></select></label><label>Potencia nominal · <strong id="powerLabel">1.0 kWp</strong><input id="power" type="range" min=".2" max="10" step=".1" value="1"></label><label>Demanda · kWh/día<input id="demand" type="number" min=".1" max="1000" step=".1" value="3"></label><label>Performance ratio · <strong id="prLabel">0.80</strong><input id="pr" type="range" min=".5" max="1" step=".01" value=".8"></label></section><section class="stats" aria-live="polite"><div class="stat"><span>Producción anual estimada</span><strong id="annual"></strong><small>kWh · suma de los 365 días</small></div><div class="stat"><span>Mes de menor recurso</span><strong id="worst"></strong><small id="worstValue"></small></div><div class="stat"><span>Potencia orientativa para ese mes</span><strong id="required"></strong><small>kWp · cubre la demanda media elegida</small></div><div class="stat"><span>Energía anual / demanda anual</span><strong id="coverage"></strong><small>Comparación agregada de energía</small></div></section><div class="chart-head"><h2>Producción media diaria por mes</h2><label class="compare"><input type="checkbox" id="compare">Comparar las tres ciudades</label></div><div id="chart" aria-label="Gráfico mensual de producción media diaria y demanda"></div><div class="table-wrap"><table><thead><tr><th>Mes</th><th>Días</th><th>Irradiación media<br>kWh/m²/día</th><th>Producción media<br>kWh/día</th><th>Producción total<br>kWh/mes</th></tr></thead><tbody id="rows"></tbody></table></div><button id="download" class="download">Descargar tabla CSV ↓</button><details class="methods"><summary>Fuente, cálculo y supuestos</summary><div class="notes"><p><strong>Dato real:</strong> ALLSKY_SFC_SW_DWN de NASA POWER. Irradiación diaria estimada sobre una superficie horizontal en una celda geográfica. No son mediciones de un instrumento instalado en cada ciudad.</p><p><code>Horas solares equivalentes = irradiación / 1 kW/m²</code><br><code>Energía diaria [kWh] = potencia [kWp] × horas solares [h] × performance ratio</code></p><p>El performance ratio inicial de 0.80 es un supuesto editable. El mes de menor recurso se identifica por la menor irradiación media diaria mensual. La potencia orientativa cubre la demanda media en ese mes bajo este modelo; no garantiza suministro cada día.</p><p>Esta aproximación no modela inclinación, sombras, almacenamiento, inversores ni estructura eléctrica. Cobertura anual es una comparación de energía, no un indicador de autonomía o disponibilidad horaria.</p><p>Los 365 días por ciudad fueron comprobados y no contienen valores de relleno. Los promedios mensuales usan los días reales y los totales suman cada registro.</p><p id="provenance"></p><a href="../build.py">Código reproducible ↗</a> · <a href="daily.csv">Datos diarios CSV ↗</a> · <a href="summary.json">Resumen y procedencia ↗</a></div></details><p class="footer">DeepSkill · Herramienta educativa construida con pandas y Plotly · Cálculos locales: los controles no llaman a un LLM.</p></main><script>
const DATA=__DATA__, months=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'], fullMonths=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const colors={lima:'#4d7fff',arequipa:'#99ff32',piura:'#ffb969'};
function parameters(){const raw=Number(document.getElementById('demand').value);return {city:DATA.cities.find(c=>c.slug===document.getElementById('city').value),power:Number(document.getElementById('power').value),pr:Number(document.getElementById('pr').value),demand:Math.min(1000,Math.max(.1,Number.isFinite(raw)?raw:.1))};}
function update(){const {city,power,pr,demand}=parameters();document.getElementById('powerLabel').textContent=power.toFixed(1)+' kWp';document.getElementById('prLabel').textContent=pr.toFixed(2);const factor=power*pr,annual=city.annual_irradiation_kwh_m2*factor,worst=city.months.reduce((a,b)=>a.mean_irradiation<b.mean_irradiation?a:b);document.getElementById('annual').textContent=annual.toLocaleString('es-PE',{maximumFractionDigits:0});document.getElementById('worst').textContent=fullMonths[worst.month-1];document.getElementById('worstValue').textContent=worst.mean_irradiation.toFixed(2)+' kWh/m²/día';document.getElementById('required').textContent=(demand/(worst.mean_irradiation*pr)).toFixed(2);document.getElementById('coverage').textContent=(annual/(demand*365)*100).toFixed(0)+'%';const chosen=document.getElementById('compare').checked?DATA.cities:[city];const traces=chosen.map(c=>({x:months,y:c.months.map(m=>m.mean_irradiation*factor),name:c.name,type:'scatter',mode:'lines+markers',line:{color:colors[c.slug],width:3},marker:{size:7},hovertemplate:'%{x}: %{y:.2f} kWh/día<extra>'+c.name+'</extra>'}));traces.push({x:months,y:months.map(()=>demand),name:'Demanda',type:'scatter',mode:'lines',line:{color:'#a0a0b8',width:2,dash:'dash'},hovertemplate:'Demanda: %{y:.2f} kWh/día<extra></extra>'});Plotly.react('chart',traces,{paper_bgcolor:'#0c0c14',plot_bgcolor:'#0c0c14',font:{color:'#a0a0b8',family:'Geist, system-ui',size:13},margin:{l:65,r:25,t:35,b:55},xaxis:{gridcolor:'#ffffff08',zeroline:false},yaxis:{title:{text:'Energía · kWh/día'},gridcolor:'#ffffff12',rangemode:'tozero',zeroline:false},legend:{orientation:'h',x:0,y:1.12},hovermode:'x unified',uirevision:'solar'},{responsive:true,displaylogo:false,modeBarButtonsToRemove:['lasso2d','select2d']});document.getElementById('rows').innerHTML=city.months.map(m=>'<tr><td>'+fullMonths[m.month-1]+'</td><td>'+m.days+'</td><td>'+m.mean_irradiation.toFixed(3)+'</td><td>'+(m.mean_irradiation*factor).toFixed(3)+'</td><td>'+(m.total_irradiation*factor).toFixed(3)+'</td></tr>').join('');document.getElementById('provenance').textContent='Descarga: '+DATA.retrieved_at+'. Coordenadas de '+city.name+': '+city.latitude+', '+city.longitude+'. Período: 2025. Hora solar local (LST).';}
['city','power','pr','demand','compare'].forEach(id=>document.getElementById(id).addEventListener('input',update));
document.getElementById('download').addEventListener('click',()=>{const {city,power,pr,demand}=parameters();const rows=['city,month,days,irradiation_kwh_m2_day,power_kwp,performance_ratio,demand_kwh_day,energy_kwh_day,energy_kwh_month'];city.months.forEach(m=>rows.push([city.name,m.month,m.days,m.mean_irradiation,power,pr,demand,m.mean_irradiation*power*pr,m.total_irradiation*power*pr].join(',')));const url=URL.createObjectURL(new Blob([rows.join('\n')],{type:'text/csv;charset=utf-8'})),anchor=document.createElement('a');anchor.href=url;anchor.download='solar-'+city.slug+'-2025.csv';anchor.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
update();
</script></body></html>"""


def build(live=False):
    OUTPUT.mkdir(parents=True, exist_ok=True)
    metadata = json.loads((DATA / "sources.json").read_text())
    rows, cities = [], []
    if live:
        metadata["retrieved_at"] = datetime.now(timezone.utc).isoformat()
    for city in metadata["cities"]:
        if live:
            response = requests.get(city["url"], timeout=50)
            response.raise_for_status()
            raw = response.content
            (OUTPUT / city["file"]).write_bytes(raw)
        else:
            raw = (DATA / city["file"]).read_bytes()
            if hashlib.sha256(raw).hexdigest() != city["sha256"]:
                raise ValueError("Source hash mismatch: " + city["slug"])
        payload = json.loads(raw)
        units = payload["parameters"]["ALLSKY_SFC_SW_DWN"]["units"]
        if units != "kW-hr/m^2/day":
            raise ValueError("Unexpected NASA units: " + units)
        values = payload["properties"]["parameter"]["ALLSKY_SFC_SW_DWN"]
        fill = payload["header"]["fill_value"]
        city_rows = []
        for date, value in values.items():
            if value == fill or value is None:
                raise ValueError("Missing solar value: " + city["slug"] + " " + date)
            if not math.isfinite(value) or value < 0:
                raise ValueError("Invalid solar value")
            row = {"city": city["name"], "slug": city["slug"], "date": date,
                   "irradiation_kwh_m2_day": value}
            rows.append(row)
            city_rows.append(row)
        df = pd.DataFrame(city_rows)
        df["date"] = pd.to_datetime(df["date"], format="%Y%m%d")
        if len(df) != 365 or df["date"].nunique() != 365:
            raise ValueError("Expected a full non-leap year")
        if df["date"].min() != pd.Timestamp("2025-01-01") or df["date"].max() != pd.Timestamp("2025-12-31"):
            raise ValueError("Unexpected period")
        grouped = df.assign(month=df["date"].dt.month).groupby("month")["irradiation_kwh_m2_day"].agg(["mean", "sum", "count"])
        months = [{"month": int(month), "days": int(row["count"]),
                   "mean_irradiation": float(row["mean"]), "total_irradiation": float(row["sum"])}
                  for month, row in grouped.iterrows()]
        cities.append({**city, "sha256": hashlib.sha256(raw).hexdigest(),
                       "annual_irradiation_kwh_m2": float(df["irradiation_kwh_m2_day"].sum()),
                       "months": months})
    summary = {**metadata, "cities": cities}
    (OUTPUT / "summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n")
    pd.DataFrame(rows).to_csv(OUTPUT / "daily.csv", index=False)
    pd.DataFrame([{"city": c["name"], **m} for c in cities for m in c["months"]]).to_csv(OUTPUT / "monthly.csv", index=False)
    html = HTML.replace("__DATA__", json.dumps(summary, ensure_ascii=False)).replace("__PLOTLY__", get_plotlyjs())
    (OUTPUT / "index.html").write_text(html)
    for city in cities:
        worst = min(city["months"], key=lambda m: m["mean_irradiation"])
        print(json.dumps({"city": city["name"], "annual_kwh_1kwp_pr08": round(city["annual_irradiation_kwh_m2"] * .8, 3),
                          "worst_month": worst["month"], "required_kwp_for_3kwh_day": round(3 / (worst["mean_irradiation"] * .8), 3)}, ensure_ascii=False))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--live", action="store_true", help="Fetch the fixed 2025 period using requests; archive new responses in output.")
    build(parser.parse_args().live)

