import { ingredientDensities, densityById } from '../data/ingredient-densities.js';
import { gramsToMl, mlToGrams, formatDensity } from '../math/density.js';

const number = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 });

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#density-converter-form');
  if (!form) return;

  const ingredient = form.elements.ingredient;
  const direction = form.elements.direction;
  const amount = form.elements.amount;
  const customWrap = form.querySelector('[data-custom-density-wrap]');
  const customDensity = form.elements.customDensity;
  const result = document.querySelector('#density-converter-result');
  const error = form.querySelector('[data-density-error]');

  const syncIngredient = () => {
    const custom = ingredient.value === 'custom';
    customWrap.hidden = !custom;
    if (!custom) {
      const selected = densityById(ingredient.value);
      if (selected) customDensity.value = selected.density;
    }
  };

  const calculate = (event) => {
    event?.preventDefault();
    error.hidden = true;
    const value = Number(String(amount.value).replace(',', '.'));
    const selected = ingredient.value === 'custom' ? null : densityById(ingredient.value);
    const density = selected ? selected.density : Number(String(customDensity.value).replace(',', '.'));
    if (!Number.isFinite(value) || value < 0 || !Number.isFinite(density) || density <= 0) {
      error.textContent = 'Introduce una cantidad válida y una densidad mayor que cero.';
      error.hidden = false;
      result.hidden = true;
      return;
    }

    const toMl = direction.value === 'g-to-ml';
    const converted = toMl ? gramsToMl(value, density) : mlToGrams(value, density);
    const fromUnit = toMl ? 'g' : 'ml';
    const toUnit = toMl ? 'ml' : 'g';
    const ingredientName = selected?.name || 'Ingrediente personalizado';
    const note = selected?.note || 'La precisión depende de la densidad que hayas introducido.';

    result.innerHTML = `<p class="metric-label">${ingredientName}</p><p class="big-number">${number.format(converted)} ${toUnit}</p><p>${number.format(value)} ${fromUnit} ${toMl ? '÷' : '×'} ${formatDensity(density)} g/ml.</p><p class="notice">${note} Para repostería precisa, una báscula suele ser más fiable que convertir ingredientes secos por volumen.</p>`;
    result.hidden = false;
    result.focus();
  };

  ingredient.addEventListener('change', () => { syncIngredient(); calculate(); });
  direction.addEventListener('change', calculate);
  form.addEventListener('submit', calculate);
  syncIngredient();
  calculate();
});

export { ingredientDensities };
