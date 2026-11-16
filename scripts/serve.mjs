import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2'};
const server=http.createServer((request,response)=>{
  const pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname);
  let file=path.join(root,pathname==='/'?'index.html':pathname.slice(1));
  if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory())file=path.join(root,'index.html');
  response.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});
  fs.createReadStream(file).pipe(response);
});
server.listen(4202,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4202'));
