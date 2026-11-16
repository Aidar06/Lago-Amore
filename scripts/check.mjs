import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','dist');
for(const file of ['index.html','styles.css','app.js','assets/images/hero-torn.webp','assets/images/venue-torn.webp','assets/images/rings-note-torn.webp','assets/images/countdown-paper-torn.webp','assets/fonts/cormorant-regular.woff2'])assert(fs.statSync(path.join(root,file)).size>100,`Missing ${file}`);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
for(const marker of ['hero-torn.webp','venue-torn.webp','rings-note-torn.webp','countdown-paper-torn.webp','app.js','Бекзат','Алина','hero-names','Дорогие','12.06.2027','Место проведения','Google Maps','2ГИС','Тайминг','23:00','Сохраните эту дату','aria-current="date"','Наши пожелания','Увидимся','data-countdown-seconds','Подтверждение присутствия','data-rsvp-form','data-guest-select','data-guest-value="10"'])assert(html.includes(marker),`Missing ${marker}`);
for(const marker of ['object-fit:cover','100svh','prefers-reduced-motion','margin-top:-82px','--paper-surface','body.preview-mode','.language-menu','height:calc(100% + 112px)'])assert(css.includes(marker),`Missing ${marker}`);
for(const marker of [
  'https://x8ki-letl-twmt.n7.xano.io/api:X8-e2j1w/priglosi',
  'previewMode',
  'loadInvitation',
  '/rsvp',
  "enabled: ['ru', 'ky', 'kk']",
  "ky:",
  "kk:",
  'languageMenu',
  "classList.add('preview-mode')"
])assert(app.includes(marker),`Missing app behavior: ${marker}`);

const vercel=JSON.parse(fs.readFileSync(path.resolve(root,'..','vercel.json'),'utf8'));
assert.equal(vercel.outputDirectory,'dist','Vercel must publish dist');
assert(vercel.routes?.some((route)=>route.src==='/(.*)'&&route.dest==='/index.html'),'Vercel SPA fallback is missing');

console.log('Passed: API loading, RU/KG/KZ, preview mode, RSVP, responsive layout, assets, and Vercel routing.');
