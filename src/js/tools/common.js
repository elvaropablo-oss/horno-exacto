import { parseQuantity } from '../math/oven-math.js';

export function ingredientRow(values = {}) {
  const row = document.createElement('div');
  row.className = 'ingredient-row';
  row.innerHTML = `
    <label>Ingrediente<input name="ingredient-name" value="${escapeAttribute(values.name || '')}" autocomplete="off"></label>
    <label>Cantidad<input name="ingredient-quantity" value="${escapeAttribute(values.quantity || '')}" inputmode="decimal" placeholder="250 o 1/2"></label>
    <label>Unidad<input name="ingredient-unit" value="${escapeAttribute(values.unit || 'g')}" autocomplete="off"></label>
    <button type="button" class="button button--quiet remove-row" aria-label="Eliminar ingrediente">Eliminar</button>`;
  row.querySelector('.remove-row').addEventListener('click', () => row.remove());
  return row;
}

export function readIngredientRows(container) {
  return [...container.querySelectorAll('.ingredient-row')].map((row) => {
    const name = row.querySelector('[name="ingredient-name"]').value.trim();
    const raw = row.querySelector('[name="ingredient-quantity"]').value.trim();
    const unit = row.querySelector('[name="ingredient-unit"]').value.trim();
    if (!name || !raw) throw new TypeError('Completa nombre y cantidad en cada ingrediente.');
    if (/^al gusto$/i.test(raw)) return { name, quantity: null, unit: '', note: 'al gusto' };
    if (!unit) throw new TypeError('Indica la unidad de cada cantidad numérica.');
    return { name, quantity: parseQuantity(raw), unit };
  });
}

export function escapeAttribute(value) {
  return String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char]);
}

export function downloadJson(filename, value) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
