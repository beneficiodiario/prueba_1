import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createPreviewServer } from './preview-static.mjs';
const source=JSON.parse(readFileSync('dist/politica/fuentes.json','utf8'));
assert.equal(source.app,'Afín');
assert.equal(source.parties.length,57);
for(const path of ['politica.html','politica/privacidad.html']){
  const html=readFileSync('dist/'+path,'utf8');
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.ok(html.includes('info@beneficiodiario.com'));
  assert.ok(!/<script|<iframe|<form|fonts.googleapis|analytics/i.test(html));
  assert.ok(html.includes('no representa')||html.includes('No representa'));
}
const server=createPreviewServer();
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
try{
  const base=`http://127.0.0.1:${server.address().port}`;
  for(const path of ['/politica','/politica/privacidad','/politica/fuentes.json'])assert.equal((await fetch(base+path)).status,200,path);
}finally{await new Promise(resolve=>server.close(resolve))}
console.log('Afín: portada y privacidad públicas, HTML accesible sin JavaScript y fuentes verificadas en el servidor estático local.');
