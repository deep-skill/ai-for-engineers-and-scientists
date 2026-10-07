import http from 'node:http';
import { createReadStream, watch } from 'node:fs';
import { stat, realpath } from 'node:fs/promises';
import { dirname, resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 8765);
const clients = new Set();
let version = String(Date.now()), debounce;
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.ico':'image/x-icon','.woff2':'font/woff2','.csv':'text/csv; charset=utf-8','.md':'text/plain; charset=utf-8'};
const server = http.createServer(async (req,res) => {
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405);res.end();return; }
  let pathname;
  try { pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname); }
  catch { res.writeHead(400);res.end('Invalid path');return; }
  if(pathname==='/__version') {res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify({version}));return;}
  if(pathname==='/__events') {
    res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive'});
    res.write('event: ready\ndata: '+JSON.stringify({version})+'\n\n');clients.add(res);
    req.on('close',()=>clients.delete(res));return;
  }
  if(pathname.split('/').some(p=>p.startsWith('.'))) {res.writeHead(403);res.end('Forbidden');return;}
  const path=resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
  try {
    const canonical=await realpath(path);
    if(!canonical.startsWith(root+sep)) {res.writeHead(403);res.end('Forbidden');return;}
    const info=await stat(canonical);
    if(!info.isFile()) throw new Error('Not a file');
    res.writeHead(200,{'Content-Type':mime[extname(path)]||'application/octet-stream','Cache-Control':'no-store','Content-Length':info.size,'X-Content-Type-Options':'nosniff'});
    if(req.method==='HEAD') res.end();else createReadStream(canonical).pipe(res);
  } catch {res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Not found');}
});
const watcher=watch(root,{recursive:true},(_event,filename)=>{
  if(!filename||filename.split(/[\\/]/).some(p=>p.startsWith('.')||p==='node_modules'||p==='__pycache__'))return;
  clearTimeout(debounce);debounce=setTimeout(()=>{version=String(Date.now());for(const client of clients)client.write('event: changed\ndata: '+JSON.stringify({version})+'\n\n');},250);
});
const heartbeat=setInterval(()=>{for(const client of clients)client.write(': keepalive\n\n');},20000);heartbeat.unref();
server.listen(port,'127.0.0.1',()=>console.log('DeepSkill preview: http://127.0.0.1:'+port));
process.on('SIGINT',()=>{watcher.close();clearTimeout(debounce);clearInterval(heartbeat);for(const client of clients)client.end();server.close();});
