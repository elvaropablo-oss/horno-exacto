import { recipes, recipeById, categoryLabel } from '../data/recipes.js';

const basePath = '/horno-exacto/';
const favoritesKey = 'he:v1:recipe-favorites';
const transferKey = 'he:v1:recipe-transfer';
const number = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 });

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
else init();

function init() {
  if (document.body.dataset.tool === 'recipes') setupRecipeIdeas();
  if (document.body.dataset.tool === 'scale') setTimeout(applyRecipeTransfer, 0);
  setupRecipeDetail();
}

function setupRecipeIdeas() {
  const grid = document.querySelector('[data-recipe-grid]');
  const status = document.querySelector('[data-recipe-status]');
  const empty = document.querySelector('[data-recipe-empty]');
  const form = document.querySelector('[data-recipe-filters]');
  const dialog = document.querySelector('[data-recipe-dialog]');
  const dialogContent = document.querySelector('[data-recipe-dialog-content]');
  if (!grid || !form || !dialog || !dialogContent) return;

  const fields = {
    search: document.querySelector('#recipe-search'),
    pantry: document.querySelector('#recipe-pantry'),
    category: document.querySelector('#recipe-category'),
    time: document.querySelector('#recipe-time'),
    difficulty: document.querySelector('#recipe-difficulty'),
    favoritesOnly: document.querySelector('#recipe-favorites-only')
  };

  let favorites = loadFavorites();
  let visible = [];

  const refresh = () => {
    const search = normalize(fields.search.value);
    const pantryTerms = splitTerms(fields.pantry.value);
    const category = fields.category.value;
    const maxTime = Number(fields.time.value);
    const difficulty = fields.difficulty.value;
    const favoritesOnly = fields.favoritesOnly.checked;

    visible = recipes
      .map((recipe) => ({ ...recipe, pantryMatches: pantryMatchCount(recipe, pantryTerms) }))
      .filter((recipe) => !search || searchableText(recipe).includes(search))
      .filter((recipe) => !category || recipe.category === category)
      .filter((recipe) => !maxTime || recipe.minutes <= maxTime)
      .filter((recipe) => !difficulty || recipe.difficulty === difficulty)
      .filter((recipe) => !favoritesOnly || favorites.has(recipe.id))
      .filter((recipe) => !pantryTerms.length || recipe.pantryMatches > 0)
      .sort((a, b) => pantryTerms.length ? b.pantryMatches - a.pantryMatches || a.minutes - b.minutes : a.minutes - b.minutes);

    grid.replaceChildren(...visible.map((recipe) => recipeCard(recipe, favorites, pantryTerms.length)));
    empty.hidden = visible.length !== 0;
    status.textContent = visible.length === 1 ? '1 receta encontrada.' : `${visible.length} recetas encontradas.`;
    bindGridActions();
  };

  const bindGridActions = () => {
    grid.querySelectorAll('[data-recipe-open]').forEach((button) => button.addEventListener('click', () => openRecipe(button.dataset.recipeOpen)));
    grid.querySelectorAll('[data-recipe-favorite]').forEach((button) => button.addEventListener('click', () => {
      toggleFavorite(button.dataset.recipeFavorite, favorites);
      favorites = loadFavorites();
      refresh();
    }));
    grid.querySelectorAll('[data-recipe-scale]').forEach((button) => button.addEventListener('click', () => transferRecipe(button.dataset.recipeScale)));
  };

  const openRecipe = (id) => {
    const recipe = recipeById(id);
    if (!recipe) return;
    dialogContent.innerHTML = recipeDetail(recipe, favorites.has(recipe.id));
    bindDialogScaling(dialogContent, recipe);
    dialogContent.querySelector('[data-recipe-favorite]')?.addEventListener('click', (event) => {
      toggleFavorite(recipe.id, favorites);
      favorites = loadFavorites();
      updateFavoriteButton(event.currentTarget, favorites.has(recipe.id));
      refresh();
    });
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  };

  form.addEventListener('input', refresh);
  form.addEventListener('change', refresh);
  form.addEventListener('reset', () => setTimeout(refresh, 0));

  document.querySelectorAll('[data-recipe-surprise]').forEach((button) => button.addEventListener('click', () => {
    const pool = visible.length ? visible : recipes;
    openRecipe(pool[Math.floor(Math.random() * pool.length)].id);
  }));

  document.querySelector('[data-recipe-show-favorites]')?.addEventListener('click', () => {
    fields.favoritesOnly.checked = true;
    refresh();
    document.querySelector('.recipe-discovery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  refresh();
}

function setupRecipeDetail() {
  const root = document.querySelector('[data-recipe-detail]');
  if (!root) return;
  const recipe = recipeById(root.dataset.recipeDetail);
  const input = root.querySelector('[data-recipe-servings]');
  const factorNode = root.querySelector('[data-recipe-factor]');
  if (!recipe || !input) return;

  let favorites = loadFavorites();
  const favoriteButton = root.querySelector('[data-recipe-favorite]');
  updateFavoriteButton(favoriteButton, favorites.has(recipe.id));

  const refresh = () => {
    const servings = sanitizeServings(input.value, recipe.servings);
    input.value = servings;
    const factor = servings / recipe.servings;
    factorNode.textContent = `Factor × ${formatQuantity(factor)}`;
    root.querySelectorAll('[data-recipe-ingredient]').forEach((item) => {
      const quantity = Number(item.dataset.baseQuantity);
      const target = item.querySelector('[data-recipe-quantity]');
      if (target && Number.isFinite(quantity)) target.textContent = formatQuantity(quantity * factor);
    });
  };

  input.addEventListener('input', refresh);
  input.addEventListener('change', refresh);
  root.querySelector('[data-recipe-transfer]')?.addEventListener('click', () => transferRecipe(recipe.id, sanitizeServings(input.value, recipe.servings)));
  favoriteButton?.addEventListener('click', () => {
    toggleFavorite(recipe.id, favorites);
    favorites = loadFavorites();
    updateFavoriteButton(favoriteButton, favorites.has(recipe.id));
  });
  refresh();
}

function bindDialogScaling(root, recipe) {
  const input = root.querySelector('[data-recipe-dialog-servings]');
  const list = root.querySelector('[data-recipe-dialog-ingredients]');
  const factorNode = root.querySelector('[data-recipe-dialog-factor]');
  const transferButton = root.querySelector('[data-recipe-scale]');
  if (!input || !list) return;

  const refresh = () => {
    const servings = sanitizeServings(input.value, recipe.servings);
    input.value = servings;
    const factor = servings / recipe.servings;
    factorNode.textContent = `× ${formatQuantity(factor)}`;
    list.innerHTML = recipe.ingredients.map(([quantity, unit, name]) => `<li><strong>${formatQuantity(quantity * factor)} ${unit}</strong> ${name}</li>`).join('');
  };
  input.addEventListener('input', refresh);
  input.addEventListener('change', refresh);
  transferButton?.addEventListener('click', () => transferRecipe(recipe.id, sanitizeServings(input.value, recipe.servings)));
  refresh();
}

function recipeCard(recipe, favorites, hasPantry) {
  const favorite = favorites.has(recipe.id);
  const match = hasPantry && recipe.pantryMatches ? `<span class="recipe-match">${recipe.pantryMatches} coincidencia${recipe.pantryMatches === 1 ? '' : 's'}</span>` : '';
  return htmlToElement(`<article class="recipe-card">
    <div class="recipe-card-top"><span class="recipe-category">${categoryLabel(recipe.category)}</span>${match}<button class="recipe-favorite" type="button" data-recipe-favorite="${recipe.id}" aria-pressed="${favorite}" aria-label="${favorite ? 'Quitar de favoritas' : 'Guardar como favorita'}">${favorite ? '★' : '☆'}</button></div>
    <h3><a href="${basePath}recetas/${recipe.id}/">${recipe.title}</a></h3>
    <p>${recipe.description}</p>
    <dl class="recipe-meta"><div><dt>Raciones</dt><dd>${recipe.servings}</dd></div><div><dt>Tiempo</dt><dd>${recipe.minutes} min</dd></div><div><dt>Horno</dt><dd>${recipe.temperature} °C</dd></div></dl>
    <div class="recipe-card-actions"><a class="button" href="${basePath}recetas/${recipe.id}/">Ver receta</a><button class="button button--quiet" type="button" data-recipe-open="${recipe.id}">Vista rápida</button></div>
  </article>`);
}

function recipeDetail(recipe, favorite) {
  return `<p class="metric-label">${categoryLabel(recipe.category)} · ${recipe.minutes} min · ${recipe.temperature} °C</p>
    <h2 id="recipe-dialog-title">${recipe.title}</h2>
    <p class="recipe-dialog-lead">${recipe.description}</p>
    <div class="recipe-dialog-scale"><label>Raciones<input type="number" min="1" max="50" step="1" value="${recipe.servings}" data-recipe-dialog-servings></label><strong data-recipe-dialog-factor>× 1</strong><a href="${basePath}recetas/${recipe.id}/">Abrir receta completa</a></div>
    <div class="recipe-dialog-columns">
      <section><h3>Ingredientes</h3><ul class="recipe-ingredients" data-recipe-dialog-ingredients></ul></section>
      <section><h3>Recorrido orientativo</h3><ol class="recipe-steps">${recipe.steps.map((step) => `<li>${step}</li>`).join('')}</ol></section>
    </div>
    <p class="notice">Temperatura y tiempo son referencias de partida. Cambiar raciones, tamaño o molde puede exigir ajustes; comprueba siempre el punto de cocción.</p>
    <div class="result-actions"><button class="button" type="button" data-recipe-scale="${recipe.id}">Llevar al escalador</button><button class="button button--quiet" type="button" data-recipe-favorite="${recipe.id}" aria-pressed="${favorite}">${favorite ? '★ Guardada' : '☆ Guardar favorita'}</button></div>`;
}

function transferRecipe(id, targetServings) {
  const recipe = recipeById(id);
  if (!recipe) return;
  const servings = sanitizeServings(targetServings ?? recipe.servings, recipe.servings);
  const factor = servings / recipe.servings;
  const payload = {
    title: recipe.title,
    sourceServings: recipe.servings,
    targetServings: servings,
    lines: recipe.ingredients.map(([quantity, unit, name]) => `${formatMachineQuantity(quantity * factor)} ${unit} ${name}`)
  };
  try { localStorage.setItem(transferKey, JSON.stringify(payload)); } catch {}
  window.location.href = `${basePath}escalar-receta/`;
}

function applyRecipeTransfer() {
  let payload;
  try { payload = JSON.parse(localStorage.getItem(transferKey) || 'null'); } catch { payload = null; }
  if (!payload || !Array.isArray(payload.lines)) return;
  const paste = document.querySelector('#ingredient-paste');
  const parseButton = document.querySelector('#parse-ingredients');
  const feedback = document.querySelector('#parse-feedback');
  const factor = document.querySelector('#scale-form [name="factor"]');
  if (!paste || !parseButton) return;
  paste.value = payload.lines.join('\n');
  if (factor) factor.value = '1';
  parseButton.click();
  if (feedback) {
    const servings = payload.targetServings ? ` para ${payload.targetServings} raciones` : '';
    feedback.textContent = `Receta cargada: ${payload.title}${servings}. Revisa las cantidades antes de escalar.`;
  }
  try { localStorage.removeItem(transferKey); } catch {}
  document.querySelector('#scale-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function loadFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
    return new Set(Array.isArray(value) ? value.filter((id) => recipes.some((recipe) => recipe.id === id)) : []);
  } catch {
    return new Set();
  }
}

function toggleFavorite(id, favorites) {
  if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
  try { localStorage.setItem(favoritesKey, JSON.stringify([...favorites])); } catch {}
}

function updateFavoriteButton(button, favorite) {
  if (!button) return;
  button.textContent = favorite ? '★ Guardada' : '☆ Guardar favorita';
  button.setAttribute('aria-pressed', String(favorite));
}

function pantryMatchCount(recipe, terms) {
  if (!terms.length) return 0;
  const ingredients = normalize(recipe.ingredients.map(([, , name]) => name).join(' '));
  return terms.filter((term) => ingredients.includes(term)).length;
}

function searchableText(recipe) {
  return normalize(`${recipe.title} ${recipe.description} ${categoryLabel(recipe.category)} ${recipe.ingredients.map(([, , name]) => name).join(' ')}`);
}

function splitTerms(value) {
  return normalize(value).split(/[,;]+/).map((item) => item.trim()).filter(Boolean);
}

function normalize(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function sanitizeServings(value, fallback) {
  const parsed = Math.round(Number(String(value).replace(',', '.')));
  return Number.isFinite(parsed) && parsed >= 1 ? Math.min(parsed, 50) : fallback;
}

function formatQuantity(value) {
  return number.format(value);
}

function formatMachineQuantity(value) {
  const rounded = Math.round(value * 1000) / 1000;
  return Number.isInteger(rounded) ? String(rounded) : String(rounded);
}

function htmlToElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}
