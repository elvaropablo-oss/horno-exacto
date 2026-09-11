import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages } from '../src/pages/pages.mjs';
import { recipePages } from '../src/pages/recipes.mjs';
import { renderPage } from '../src/templates/site.mjs';
import { site } from '../site.config.mjs';
import { applyShareableCalculations } from './shareable-calculations.mjs';
import { applyCalculationExplanations } from './calculation-explanations.mjs';
import { applyProjectLibrary } from './project-library.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const allPages = [...pages, ...recipePages];
const shareableForms = ['pan-form', 'scale-form', 'baker-form', 'temperature-form'];
const explanations = {
  'pan-form': { formula: 'factor = (nº moldes finales × área final × altura final) ÷ (nº moldes originales × área original × altura original); cantidad nueva = cantidad original × factor', fields: [['origin-count', 'Moldes originales'], ['origin-height', 'Altura de masa original', 'cm'], ['destination-count', 'Moldes finales'], ['destination-height', 'Altura de masa final', 'cm']], note: 'El área depende de la forma: círculo = π·d²/4, cuadrado = lado² y rectángulo = ancho·largo.' },
  'scale-form': { formula: 'cantidad nueva = cantidad original × factor. Por raciones: factor = raciones finales ÷ raciones originales. Por ingrediente objetivo: factor = cantidad objetivo ÷ cantidad original de ese ingrediente.', fields: [['factor', 'Factor directo'], ['source-servings', 'Raciones originales'], ['target-servings', 'Raciones finales'], ['target-quantity', 'Cantidad objetivo']], note: 'El mismo factor se aplica a cada ingrediente para mantener las proporciones de la receta.' },
  'baker-form': { formula: 'masa de ingrediente = masa total de harina × porcentaje ÷ 100; masa total = harina + suma de ingredientes; masa por pieza = masa total ÷ nº de piezas', fields: [['pieces', 'Número de piezas'], ['total-mass', 'Masa total objetivo', 'g']], note: 'En porcentaje panadero, el conjunto de harinas representa el 100 % de referencia.' },
  'temperature-form': { formula: '°F = °C × 9/5 + 32; °C = (°F − 32) × 5/9; como referencia general, ventilador ≈ convencional − 20 °C', fields: [['temperature', 'Temperatura introducida']], note: 'La equivalencia de −20 °C para ventilador es orientativa; la receta y el manual del horno tienen prioridad.' }
};
await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, 'assets'), { recursive: true });
await cp(path.join(root, 'src/js'), path.join(dist, 'assets'), { recursive: true });
await cp(path.join(root, 'src/assets'), path.join(dist, 'assets'), { recursive: true });
await cp(path.join(root, 'src/styles/site.css'), path.join(dist, 'assets/site.css'));
for (const page of allPages) {
  const destination = page.output ? path.join(dist, page.output) : page.path ? path.join(dist, page.path, 'index.html') : path.join(dist, 'index.html');
  await mkdir(path.dirname(destination), { recursive: true });
  let html = applyShareableCalculations(renderPage(page), shareableForms);
  html = applyCalculationExplanations(html, explanations);
  html = applyProjectLibrary(html, { storageKey: 'he:v1:projects', formIds: shareableForms });
  await writeFile(destination, html, 'utf8');
}
const urls = allPages.filter((page) => !page.noindex && page.path !== '404').map((page) => `  <url><loc>${site.origin}${site.basePath}${page.path ? `${page.path}/` : ''}</loc></url>`).join('\n');
await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, 'utf8');
await writeFile(path.join(dist, '.nojekyll'), '', 'utf8');
console.log(`Built ${allPages.length} pages in dist/`);
