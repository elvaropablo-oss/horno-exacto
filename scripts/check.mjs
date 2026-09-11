import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const htmlFiles = await walk(dist, '.html');
const failures = [];
const analyticsId = 'G-EL1YW63SXD';
const publicPaths = new Set((await walk(dist)).map((file) => `/${path.relative(dist, file).replaceAll('\\', '/')}`));

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const rel = path.relative(dist, file);
  const h1Count = (html.match(/<h1\b/g) || []).length;
  if (h1Count !== 1) failures.push(`${rel}: esperaba 1 H1 y encontré ${h1Count}`);
  const analyticsMatches = html.match(new RegExp(analyticsId, 'g')) || [];
  if (analyticsMatches.length !== 2) failures.push(`${rel}: esperaba una única etiqueta de Google Analytics`);
  if (!html.includes(`<head>\n  <!-- Google tag (gtag.js) -->\n  <script async src="https://www.googletagmanager.com/gtag/js?id=${analyticsId}"></script>`)) {
    failures.push(`${rel}: Google Analytics no está justo después de <head>`);
  }
  for (const tag of ['<title>', 'name="description"', 'rel="canonical"', 'application/ld+json']) {
    if (!html.includes(tag)) failures.push(`${rel}: falta ${tag}`);
  }
  for (const match of html.matchAll(/(?:href|src)="(\/horno-exacto\/[^"#?]*)/g)) {
    let target = match[1].replace('/horno-exacto', '') || '/index.html';
    if (target.endsWith('/')) target += 'index.html';
    if (!publicPaths.has(target)) failures.push(`${rel}: referencia local ausente ${match[1]}`);
  }
  for (const script of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(script[1]); } catch { failures.push(`${rel}: JSON-LD no válido`); }
  }
}

const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
for (const required of ['adaptar-molde/', 'escalar-receta/', 'porcentaje-panadero/', 'convertir-temperatura-horno/']) {
  if (!sitemap.includes(required)) failures.push(`sitemap: falta ${required}`);
}
if (sitemap.includes('mi-receta/') || sitemap.includes('404')) failures.push('sitemap: contiene una ruta no indexable');
if (publicPaths.has('/robots.txt')) failures.push('robots.txt no debe publicarse en la subcarpeta de GitHub Pages');
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Checked ${htmlFiles.length} HTML files, local references, JSON-LD and sitemap.`);
}

async function walk(directory, extension = null) {
  const files = [];
  for (const name of await readdir(directory)) {
    const full = path.join(directory, name);
    if ((await stat(full)).isDirectory()) files.push(...await walk(full, extension));
    else if (!extension || full.endsWith(extension)) files.push(full);
  }
  return files;
}
