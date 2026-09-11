import { bakerFromFlour, bakerFromTotal, bakerFromWeights, convertOvenTemperature, panFactor, parseQuantity, scaleIngredients } from './math/oven-math.js';
import { announceError, clearError, formatAmount, readNumber } from './shared/format.js';
import { deleteProject, importProject, loadDraftFactor, loadProject, saveDraftFactor, saveProject } from './shared/storage.js';
import { downloadJson, ingredientRow, readIngredientRows } from './tools/common.js';

const basePath = '/horno-exacto/';

document.addEventListener('DOMContentLoaded', () => {
  const tool = document.body.dataset.tool;
  if (tool === 'pan') setupPanTool();
  if (tool === 'scale') setupScaleTool();
  if (tool === 'baker') setupBakerTool();
  if (tool === 'temperature') setupTemperatureTool();
  if (tool === 'project') setupProject();
  document.querySelectorAll('[data-print]').forEach((button) => button.addEventListener('click', () => window.print()));
});

function setupPanTool() {
  const form = document.querySelector('#pan-form');
  const error = document.querySelector('#form-error');
  const result = document.querySelector('#pan-result');
  const updateShapes = () => {
    form.querySelectorAll('[data-side]').forEach((side) => {
      const shape = form.elements.namedItem(`${side.dataset.side}-shape`).value;
      side.querySelectorAll('[data-shape]').forEach((group) => {
        group.hidden = group.dataset.shape !== shape;
        group.querySelectorAll('input').forEach((input) => { input.disabled = group.hidden; });
      });
    });
  };
  form.querySelectorAll('select[name$="-shape"]').forEach((select) => select.addEventListener('change', updateShapes));
  updateShapes();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError(error);
    try {
      const origin = panData(form, 'origin');
      const destination = panData(form, 'destination');
      const factor = panFactor(origin, destination);
      saveDraftFactor(factor);
      const direction = factor >= 1 ? 'multiplica' : 'reduce';
      result.innerHTML = `
        <p class="metric-label">Factor de adaptación</p>
        <p class="big-number">× ${formatAmount(factor)}</p>
        <p>La nueva capacidad de masa ${direction} las cantidades de la receta. Por ejemplo, 250 g pasan a <strong>${formatAmount(250 * factor)} g</strong>.</p>
        <dl class="result-details"><div><dt>Molde original</dt><dd>${formatAmount(origin.count)} unidad(es)</dd></div><div><dt>Molde final</dt><dd>${formatAmount(destination.count)} unidad(es)</dd></div></dl>
        <p class="notice">El factor ajusta cantidad y volumen ocupado. No calcula temperatura ni tiempo de horno.</p>
        <a class="button" href="${basePath}escalar-receta/#factor=${factor.toFixed(6)}">Aplicar a mis ingredientes</a>`;
      result.hidden = false;
      result.focus();
    } catch (reason) {
      result.hidden = true;
      announceError(error, reason);
    }
  });
}

function setupTemperatureTool() {
  const form = document.querySelector('#temperature-form');
  const error = document.querySelector('#form-error');
  const result = document.querySelector('#temperature-result');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError(error);
    try {
      const converted = convertOvenTemperature(
        form.elements.namedItem('temperature').value,
        form.elements.namedItem('temperature-unit').value,
        form.elements.namedItem('oven-mode').value
      );
      result.innerHTML = `
        <p class="metric-label">Equivalencias orientativas</p>
        <p class="big-number">${formatAmount(converted.conventionalCelsius)} °C</p>
        <p>Horno convencional · <strong>${formatAmount(converted.conventionalFahrenheit)} °F</strong></p>
        <dl class="result-details"><div><dt>Con ventilador</dt><dd>${formatAmount(converted.fanCelsius)} °C</dd></div><div><dt>Con ventilador</dt><dd>${formatAmount(converted.fanFahrenheit)} °F</dd></div></dl>
        <p class="notice">La reducción de 20 °C para ventilador es una referencia general. Sigue la receta y el manual de tu horno cuando indiquen otra equivalencia.</p>`;
      result.hidden = false;
      result.focus();
    } catch (reason) {
      result.hidden = true;
      announceError(error, reason);
    }
  });
}

function panData(form, side) {
  const shape = form.elements.namedItem(`${side}-shape`).value;
  const data = { shape, count: readNumber(form, `${side}-count`, `El número de moldes`), height: readNumber(form, `${side}-height`, 'La altura de masa') };
  if (shape === 'round') data.diameter = readNumber(form, `${side}-diameter`, 'El diámetro');
  if (shape === 'square') data.side = readNumber(form, `${side}-side`, 'El lado');
  if (shape === 'rectangle') {
    data.width = readNumber(form, `${side}-width`, 'El ancho');
    data.length = readNumber(form, `${side}-length`, 'El largo');
  }
  return data;
}

function setupScaleTool() {
  const form = document.querySelector('#scale-form');
  const rows = document.querySelector('#ingredient-rows');
  const paste = document.querySelector('#ingredient-paste');
  const parseFeedback = document.querySelector('#parse-feedback');
  const error = document.querySelector('#form-error');
  const result = document.querySelector('#scale-result');
  const factorInput = form.elements.namedItem('factor');
  rows.append(ingredientRow({ name: 'Harina', quantity: 250, unit: 'g' }), ingredientRow({ name: 'Azúcar', quantity: 120, unit: 'g' }), ingredientRow({ name: 'Huevos', quantity: 2, unit: 'unidades' }));
  document.querySelector('#add-ingredient').addEventListener('click', () => rows.append(ingredientRow()));
  document.querySelector('#load-scale-example').addEventListener('click', () => {
    rows.replaceChildren(ingredientRow({ name: 'Harina', quantity: 250, unit: 'g' }), ingredientRow({ name: 'Azúcar', quantity: 120, unit: 'g' }), ingredientRow({ name: 'Huevos', quantity: 2, unit: 'unidades' }));
    factorInput.value = '1,44';
  });
  const fragmentFactor = readFactorFromFragment() || loadDraftFactor();
  if (fragmentFactor) factorInput.value = String(fragmentFactor).replace('.', ',');

  form.querySelectorAll('[name="factor-mode"]').forEach((radio) => radio.addEventListener('change', () => {
    form.querySelectorAll('[data-factor-fields]').forEach((group) => {
      group.hidden = group.dataset.factorFields !== radioValue(form, 'factor-mode');
      group.querySelectorAll('input').forEach((input) => { input.disabled = group.hidden; });
    });
  }));
  form.querySelector('[name="factor-mode"]:checked').dispatchEvent(new Event('change'));

  document.querySelector('#parse-ingredients').addEventListener('click', () => {
    const { parsed, rejected } = parseIngredientLines(paste.value);
    if (parsed.length) rows.replaceChildren(...parsed.map(ingredientRow));
    parseFeedback.textContent = rejected.length
      ? `Se importaron ${parsed.length}. Revisa estas líneas: ${rejected.join(' · ')}`
      : `Se importaron ${parsed.length} ingrediente(s). Revisa la tabla antes de calcular.`;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError(error);
    try {
      const ingredients = readIngredientRows(rows);
      const factor = factorForMode(form, ingredients);
      const scaled = scaleIngredients(ingredients, factor);
      const project = saveProject({ type: 'scaled', title: 'Receta escalada', factor, baseIngredients: ingredients, ingredients: scaled });
      result.innerHTML = resultTable(scaled, factor, 'Ingredientes ajustados') + storageWarning(project);
      result.hidden = false;
      result.focus();
      result.querySelector('[data-export]').addEventListener('click', () => downloadJson('horno-exacto-receta.json', project));
    } catch (reason) {
      result.hidden = true;
      announceError(error, reason);
    }
  });
}

function factorForMode(form, ingredients) {
  const mode = radioValue(form, 'factor-mode');
  if (mode === 'factor') return readNumber(form, 'factor', 'El factor');
  if (mode === 'servings') return readNumber(form, 'target-servings', 'Las porciones finales') / readNumber(form, 'source-servings', 'Las porciones originales');
  const index = Number(form.elements.namedItem('target-index').value) - 1;
  if (!Number.isInteger(index) || !ingredients[index]) throw new TypeError('Elige el ingrediente objetivo por su número de fila.');
  return readNumber(form, 'target-quantity', 'La cantidad objetivo') / ingredients[index].quantity;
}

function parseIngredientLines(text) {
  const parsed = [];
  const rejected = [];
  for (const original of String(text).split(/\r?\n/).map((line) => line.trim()).filter(Boolean)) {
    const match = original.match(/^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:[.,]\d+)?)\s+(\S+)\s+(.+)$/);
    if (!match) { rejected.push(original); continue; }
    try {
      parsed.push({ quantity: parseQuantity(match[1]), unit: match[2], name: match[3] });
    } catch { rejected.push(original); }
  }
  return { parsed, rejected };
}

function setupBakerTool() {
  const form = document.querySelector('#baker-form');
  const flourRows = document.querySelector('#flour-rows');
  const extraRows = document.querySelector('#baker-ingredient-rows');
  const error = document.querySelector('#form-error');
  const result = document.querySelector('#baker-result');
  addBakerRow(flourRows, { name: 'Harina de trigo', value: 1000 }, 'flour');
  addBakerRow(extraRows, { name: 'Agua', value: 65 }, 'percent');
  addBakerRow(extraRows, { name: 'Sal', value: 2 }, 'percent');
  addBakerRow(extraRows, { name: 'Levadura', value: 1 }, 'percent');
  document.querySelector('#add-flour').addEventListener('click', () => addBakerRow(flourRows, {}, 'flour'));
  document.querySelector('#add-baker-ingredient').addEventListener('click', () => addBakerRow(extraRows, {}, 'percent'));

  const syncMode = () => {
    const mode = radioValue(form, 'baker-mode');
    const totalMode = mode === 'total';
    const weightMode = mode === 'weights';
    document.querySelector('#total-mass-field').hidden = !totalMode;
    flourRows.querySelectorAll('[data-value-label]').forEach((label) => { label.textContent = totalMode ? '% de harinas' : 'Gramos'; });
    extraRows.querySelectorAll('[data-value-label]').forEach((label) => { label.textContent = weightMode ? 'Gramos' : '% de harina'; });
    flourRows.querySelectorAll('input[name="row-value"]').forEach((input, index) => {
      if (index === 0 && ['100', '1000'].includes(input.value)) input.value = totalMode ? '100' : '1000';
    });
  };
  form.querySelectorAll('[name="baker-mode"]').forEach((radio) => radio.addEventListener('change', syncMode));
  syncMode();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError(error);
    try {
      const mode = radioValue(form, 'baker-mode');
      const flours = readBakerRows(flourRows, mode === 'total' ? 'percent' : 'mass');
      const ingredients = readBakerRows(extraRows, mode === 'weights' ? 'mass' : 'percent');
      const pieces = readNumber(form, 'pieces', 'El número de piezas');
      const calculation = mode === 'total'
        ? bakerFromTotal(readNumber(form, 'total-mass', 'La masa total'), flours, ingredients, pieces)
        : mode === 'weights' ? bakerFromWeights(flours, ingredients, pieces) : bakerFromFlour(flours, ingredients, pieces);
      const allRows = [...calculation.flours.map((row) => ({ ...row, quantity: row.mass, unit: 'g' })), ...calculation.ingredients.map((row) => ({ ...row, quantity: row.mass, unit: 'g' }))];
      const project = saveProject({ type: 'baker', title: 'Fórmula panadera', factor: null, ingredients: allRows, total: calculation.total, perPiece: calculation.perPiece, pieces });
      result.innerHTML = `${resultTable(allRows, null, 'Fórmula calculada')}<p><strong>Masa total:</strong> ${formatAmount(calculation.total)} g · <strong>Por pieza:</strong> ${formatAmount(calculation.perPiece)} g</p>${storageWarning(project)}`;
      result.hidden = false;
      result.focus();
      result.querySelector('[data-export]').addEventListener('click', () => downloadJson('horno-exacto-formula.json', project));
    } catch (reason) {
      result.hidden = true;
      announceError(error, reason);
    }
  });
}

function addBakerRow(container, values, type) {
  const row = document.createElement('div');
  row.className = 'ingredient-row baker-row';
  row.innerHTML = `<label>Nombre<input name="row-name" value="${values.name || ''}" autocomplete="off"></label><label><span data-value-label>${type === 'flour' ? 'Gramos' : '% de harina'}</span><input name="row-value" value="${values.value ?? ''}" inputmode="decimal"></label><button type="button" class="button button--quiet remove-row">Eliminar</button>`;
  row.querySelector('.remove-row').addEventListener('click', () => row.remove());
  container.append(row);
}

function readBakerRows(container, property) {
  return [...container.querySelectorAll('.baker-row')].map((row) => {
    const name = row.querySelector('[name="row-name"]').value.trim();
    const value = Number(row.querySelector('[name="row-value"]').value.replace(',', '.'));
    if (!name || !Number.isFinite(value) || value <= 0) throw new TypeError('Completa nombres y cantidades positivas en todas las filas.');
    return { name, [property]: value };
  });
}

function setupProject() {
  const view = document.querySelector('#project-view');
  const empty = document.querySelector('#project-empty');
  const importer = document.querySelector('#project-import');
  const importInput = document.querySelector('#project-import-file');
  const importFeedback = document.querySelector('#project-import-feedback');
  importer.addEventListener('click', () => importInput.click());
  importInput.addEventListener('change', async () => {
    const file = importInput.files?.[0];
    if (!file) return;
    try {
      if (file.size > 1_000_000) throw new TypeError('El archivo supera el límite de 1 MB.');
      importProject(JSON.parse(await file.text()));
      location.reload();
    } catch (reason) {
      importFeedback.textContent = reason instanceof Error ? reason.message : 'No se pudo importar el archivo.';
      importFeedback.hidden = false;
      importInput.value = '';
    }
  });
  const project = loadProject();
  if (!project) return;
  empty.hidden = true;
  view.hidden = false;
  view.innerHTML = `<p class="metric-label">Guardada ${new Date(project.savedAt).toLocaleString('es-ES')}</p>${resultTable(project.ingredients, project.factor, project.title, false)}${project.total ? `<p><strong>Masa total:</strong> ${formatAmount(project.total)} g · <strong>Por pieza:</strong> ${formatAmount(project.perPiece)} g</p>` : ''}<button class="button button--quiet" data-delete>Eliminar de este dispositivo</button>`;
  view.querySelector('[data-export]').addEventListener('click', () => downloadJson('horno-exacto-mi-receta.json', project));
  view.querySelector('[data-delete]').addEventListener('click', () => { deleteProject(); location.reload(); });
}

function resultTable(ingredients, factor, heading, projectLink = true) {
  const showPercent = ingredients.some((item) => Number.isFinite(item.percent));
  const rows = ingredients.map((item) => `<tr><th scope="row">${escapeHtml(item.name)}</th><td>${item.quantity == null ? 'Al gusto' : `${formatAmount(item.quantity)} ${escapeHtml(item.unit)}`}</td>${showPercent ? `<td>${Number.isFinite(item.percent) ? `${formatAmount(item.percent)} %` : '—'}</td>` : ''}</tr>`).join('');
  return `<h2>${escapeHtml(heading)}</h2>${factor ? `<p>Factor aplicado: <strong>× ${formatAmount(factor)}</strong></p>` : ''}<div class="table-wrap"><table><thead><tr><th>Ingrediente</th><th>Cantidad</th>${showPercent ? '<th>% harina</th>' : ''}</tr></thead><tbody>${rows}</tbody></table></div><div class="result-actions"><button type="button" class="button button--quiet" data-print>Imprimir</button><button type="button" class="button button--quiet" data-export>Exportar JSON</button>${projectLink ? `<a class="button button--quiet" href="${basePath}mi-receta/">Abrir Mi receta</a>` : ''}</div>`;
}

function storageWarning(project) {
  return project.storageWarning ? '<p class="notice" role="status">El cálculo funciona, pero el navegador no permitió guardarlo. Puedes exportar el JSON ahora.</p>' : '';
}

function radioValue(form, name) {
  return form.querySelector(`[name="${name}"]:checked`)?.value;
}

function readFactorFromFragment() {
  const match = location.hash.match(/(?:^#|&)factor=(\d+(?:\.\d+)?)/);
  const value = match ? Number(match[1]) : NaN;
  return Number.isFinite(value) && value > 0 && value < 1_000_000 ? value : null;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

document.addEventListener('click', (event) => {
  if (event.target.matches('[data-print]')) window.print();
});

setupAnalyticsConsent();

function setupAnalyticsConsent() {
  const banner = document.querySelector('[data-consent-banner]');
  if (!banner) return;
  let choice = null;
  try { choice = localStorage.getItem('he:v1:analytics-consent'); } catch {}
  if (!['granted', 'denied'].includes(choice)) banner.hidden = false;
  banner.querySelectorAll('[data-consent]').forEach((button) => button.addEventListener('click', () => {
    const consent = button.dataset.consent;
    try { localStorage.setItem('he:v1:analytics-consent', consent); } catch {}
    if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: consent });
    banner.hidden = true;
  }));
}
