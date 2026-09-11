const basePath = '/horno-exacto/';
const favoritesKey = 'he:v1:recipe-favorites';
const transferKey = 'he:v1:recipe-transfer';

const recipes = [
  {
    id: 'bizcocho-yogur', title: 'Bizcocho de yogur', category: 'dulce', difficulty: 'fácil', minutes: 50, temperature: 180, servings: 8,
    description: 'Un bizcocho sencillo y neutro para desayunos o meriendas.',
    ingredients: [
      [125, 'g', 'yogur natural'], [210, 'g', 'harina de trigo'], [160, 'g', 'azúcar'], [100, 'ml', 'aceite suave'], [3, 'unidades', 'huevos'], [10, 'g', 'levadura química'], [1, 'g', 'sal']
    ],
    steps: ['Mezcla los ingredientes húmedos.', 'Incorpora secos sin batir en exceso.', 'Pasa a un molde preparado.', 'Hornea hasta que el centro esté cocido.']
  },
  {
    id: 'brownie-chocolate', title: 'Brownie de chocolate', category: 'dulce', difficulty: 'fácil', minutes: 40, temperature: 175, servings: 9,
    description: 'Chocolate intenso y textura densa; ideal si tienes cacao o chocolate para fundir.',
    ingredients: [
      [170, 'g', 'chocolate negro'], [120, 'g', 'mantequilla'], [160, 'g', 'azúcar'], [2, 'unidades', 'huevos'], [75, 'g', 'harina de trigo'], [20, 'g', 'cacao en polvo'], [1, 'g', 'sal']
    ],
    steps: ['Funde chocolate y mantequilla.', 'Mezcla con azúcar y huevos.', 'Añade harina, cacao y sal.', 'Hornea sin secar en exceso el centro.']
  },
  {
    id: 'cookies-chocolate', title: 'Cookies con chocolate', category: 'dulce', difficulty: 'fácil', minutes: 30, temperature: 180, servings: 12,
    description: 'Galletas rápidas con bordes dorados y centro más tierno.',
    ingredients: [
      [120, 'g', 'mantequilla'], [130, 'g', 'azúcar moreno'], [1, 'unidad', 'huevo'], [190, 'g', 'harina de trigo'], [120, 'g', 'chocolate troceado'], [3, 'g', 'bicarbonato'], [2, 'g', 'sal']
    ],
    steps: ['Mezcla mantequilla y azúcar.', 'Añade el huevo.', 'Incorpora secos y chocolate.', 'Forma porciones y hornea hasta dorar los bordes.']
  },
  {
    id: 'banana-bread', title: 'Banana bread', category: 'dulce', difficulty: 'fácil', minutes: 65, temperature: 175, servings: 8,
    description: 'Una forma práctica de aprovechar plátanos muy maduros.',
    ingredients: [
      [300, 'g', 'plátano maduro'], [200, 'g', 'harina de trigo'], [100, 'g', 'azúcar'], [80, 'g', 'mantequilla'], [2, 'unidades', 'huevos'], [6, 'g', 'levadura química'], [2, 'g', 'canela']
    ],
    steps: ['Tritura el plátano.', 'Mézclalo con huevos y mantequilla.', 'Incorpora los ingredientes secos.', 'Hornea en molde alargado hasta que el centro esté hecho.']
  },
  {
    id: 'crumble-manzana', title: 'Crumble de manzana', category: 'dulce', difficulty: 'fácil', minutes: 45, temperature: 190, servings: 6,
    description: 'Manzana horneada con cubierta crujiente; admite pera o frutos rojos.',
    ingredients: [
      [600, 'g', 'manzana'], [100, 'g', 'harina de trigo'], [80, 'g', 'mantequilla'], [80, 'g', 'azúcar'], [40, 'g', 'copos de avena'], [2, 'g', 'canela']
    ],
    steps: ['Corta la fruta y colócala en la fuente.', 'Mezcla harina, avena, azúcar y mantequilla hasta formar migas.', 'Reparte la cobertura.', 'Hornea hasta que la fruta burbujee y la superficie dore.']
  },
  {
    id: 'magdalenas-limon', title: 'Magdalenas de limón', category: 'dulce', difficulty: 'fácil', minutes: 35, temperature: 200, servings: 12,
    description: 'Magdalenas cítricas de preparación corta para una hornada rápida.',
    ingredients: [
      [200, 'g', 'harina de trigo'], [150, 'g', 'azúcar'], [3, 'unidades', 'huevos'], [120, 'ml', 'aceite suave'], [80, 'ml', 'leche'], [10, 'g', 'levadura química'], [1, 'unidad', 'limón']
    ],
    steps: ['Bate huevos y azúcar.', 'Añade líquidos y ralladura.', 'Incorpora harina y levadura.', 'Reparte en cápsulas y hornea hasta dorar.']
  },
  {
    id: 'granola-horno', title: 'Granola al horno', category: 'dulce', difficulty: 'fácil', minutes: 35, temperature: 160, servings: 8,
    description: 'Avena tostada que puedes adaptar con frutos secos y semillas.',
    ingredients: [
      [300, 'g', 'copos de avena'], [80, 'g', 'frutos secos'], [50, 'g', 'semillas'], [60, 'g', 'miel'], [35, 'ml', 'aceite'], [2, 'g', 'canela'], [1, 'g', 'sal']
    ],
    steps: ['Mezcla todos los ingredientes.', 'Extiende en una bandeja.', 'Hornea removiendo a mitad.', 'Deja enfriar por completo antes de guardar.']
  },
  {
    id: 'focaccia', title: 'Focaccia básica', category: 'pan', difficulty: 'media', minutes: 90, temperature: 220, servings: 8,
    description: 'Masa hidratada con aceite de oliva, perfecta para practicar fermentación y horneado.',
    ingredients: [
      [500, 'g', 'harina de trigo'], [375, 'ml', 'agua'], [10, 'g', 'sal'], [5, 'g', 'levadura seca'], [35, 'ml', 'aceite de oliva']
    ],
    steps: ['Mezcla y desarrolla la masa.', 'Deja fermentar hasta que gane volumen.', 'Extiende con aceite y marca la superficie.', 'Hornea a temperatura alta hasta dorar.']
  },
  {
    id: 'panecillos', title: 'Panecillos caseros', category: 'pan', difficulty: 'media', minutes: 90, temperature: 210, servings: 8,
    description: 'Panecillos sencillos para dividir una masa y practicar piezas iguales.',
    ingredients: [
      [500, 'g', 'harina de trigo'], [320, 'ml', 'agua'], [10, 'g', 'sal'], [6, 'g', 'levadura seca'], [15, 'ml', 'aceite de oliva']
    ],
    steps: ['Amasa hasta obtener una masa uniforme.', 'Fermenta.', 'Divide en piezas y bolea.', 'Haz una segunda fermentación corta y hornea.']
  },
  {
    id: 'pizza-bandeja', title: 'Pizza de bandeja', category: 'pan', difficulty: 'media', minutes: 90, temperature: 240, servings: 4,
    description: 'Masa casera para una bandeja, con cobertura a tu gusto.',
    ingredients: [
      [350, 'g', 'harina de trigo'], [230, 'ml', 'agua'], [7, 'g', 'sal'], [4, 'g', 'levadura seca'], [15, 'ml', 'aceite de oliva'], [180, 'g', 'tomate triturado'], [180, 'g', 'mozzarella']
    ],
    steps: ['Mezcla y fermenta la masa.', 'Estira en la bandeja.', 'Añade tomate y cobertura.', 'Hornea fuerte hasta que la base y los bordes estén hechos.']
  },
  {
    id: 'verduras-asadas', title: 'Verduras asadas', category: 'salado', difficulty: 'fácil', minutes: 45, temperature: 210, servings: 4,
    description: 'Una bandeja flexible para aprovechar calabacín, pimiento, cebolla o calabaza.',
    ingredients: [
      [300, 'g', 'calabacín'], [250, 'g', 'pimiento'], [200, 'g', 'cebolla'], [300, 'g', 'calabaza'], [30, 'ml', 'aceite de oliva'], [5, 'g', 'sal']
    ],
    steps: ['Corta las verduras con tamaño parecido.', 'Mezcla con aceite y sal.', 'Extiende sin amontonar.', 'Hornea y remueve una vez para dorar de forma uniforme.']
  },
  {
    id: 'patatas-gajos', title: 'Patatas en gajos', category: 'salado', difficulty: 'fácil', minutes: 50, temperature: 220, servings: 4,
    description: 'Guarnición sencilla con exterior dorado y especias al gusto.',
    ingredients: [
      [800, 'g', 'patata'], [25, 'ml', 'aceite de oliva'], [5, 'g', 'sal'], [3, 'g', 'pimentón'], [2, 'g', 'ajo en polvo']
    ],
    steps: ['Corta las patatas en gajos regulares.', 'Sécalas y mezcla con aceite y especias.', 'Distribuye en una sola capa.', 'Hornea hasta que estén tiernas y doradas.']
  },
  {
    id: 'quiche-verduras', title: 'Quiche de verduras', category: 'salado', difficulty: 'media', minutes: 60, temperature: 185, servings: 6,
    description: 'Tarta salada adaptable a las verduras que tengas en la nevera.',
    ingredients: [
      [1, 'unidad', 'masa quebrada'], [3, 'unidades', 'huevos'], [200, 'ml', 'nata para cocinar'], [150, 'g', 'calabacín'], [120, 'g', 'cebolla'], [100, 'g', 'queso rallado'], [4, 'g', 'sal']
    ],
    steps: ['Prepara la base en el molde.', 'Saltea o escurre bien las verduras húmedas.', 'Mezcla huevos, nata y queso.', 'Rellena y hornea hasta que el centro esté cuajado.']
  },
  {
    id: 'tomates-rellenos', title: 'Tomates rellenos al horno', category: 'salado', difficulty: 'fácil', minutes: 40, temperature: 200, servings: 4,
    description: 'Una idea rápida para combinar tomate, arroz cocido y queso.',
    ingredients: [
      [4, 'unidades', 'tomates'], [250, 'g', 'arroz cocido'], [100, 'g', 'queso rallado'], [60, 'g', 'cebolla'], [15, 'ml', 'aceite de oliva'], [4, 'g', 'sal']
    ],
    steps: ['Vacía los tomates.', 'Mezcla el relleno.', 'Rellena y cubre con queso.', 'Hornea hasta que el tomate esté tierno y la superficie dore.']
  }
];

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.tool === 'recipes') setupRecipeIdeas();
  if (document.body.dataset.tool === 'scale') setTimeout(applyRecipeTransfer, 0);
});

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
    status.textContent = visible.length === 1 ? '1 idea encontrada.' : `${visible.length} ideas encontradas.`;
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
    const recipe = recipes.find((item) => item.id === id);
    if (!recipe) return;
    dialogContent.innerHTML = recipeDetail(recipe, favorites.has(recipe.id));
    dialogContent.querySelector('[data-recipe-favorite]')?.addEventListener('click', (event) => {
      toggleFavorite(recipe.id, favorites);
      favorites = loadFavorites();
      event.currentTarget.textContent = favorites.has(recipe.id) ? '★ Guardada' : '☆ Guardar favorita';
      event.currentTarget.setAttribute('aria-pressed', String(favorites.has(recipe.id)));
      refresh();
    });
    dialogContent.querySelector('[data-recipe-scale]')?.addEventListener('click', () => transferRecipe(recipe.id));
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

function recipeCard(recipe, favorites, hasPantry) {
  const favorite = favorites.has(recipe.id);
  const match = hasPantry && recipe.pantryMatches ? `<span class="recipe-match">${recipe.pantryMatches} coincidencia${recipe.pantryMatches === 1 ? '' : 's'}</span>` : '';
  return htmlToElement(`<article class="recipe-card">
    <div class="recipe-card-top"><span class="recipe-category">${categoryLabel(recipe.category)}</span>${match}<button class="recipe-favorite" type="button" data-recipe-favorite="${recipe.id}" aria-pressed="${favorite}" aria-label="${favorite ? 'Quitar de favoritas' : 'Guardar como favorita'}">${favorite ? '★' : '☆'}</button></div>
    <h3>${recipe.title}</h3>
    <p>${recipe.description}</p>
    <dl class="recipe-meta"><div><dt>Tiempo</dt><dd>${recipe.minutes} min</dd></div><div><dt>Horno</dt><dd>${recipe.temperature} °C</dd></div><div><dt>Dificultad</dt><dd>${capitalize(recipe.difficulty)}</dd></div></dl>
    <div class="recipe-card-actions"><button class="button" type="button" data-recipe-open="${recipe.id}">Ver idea</button><button class="button button--quiet" type="button" data-recipe-scale="${recipe.id}">Escalar</button></div>
  </article>`);
}

function recipeDetail(recipe, favorite) {
  return `<p class="metric-label">${categoryLabel(recipe.category)} · ${recipe.minutes} min · ${recipe.temperature} °C</p>
    <h2 id="recipe-dialog-title">${recipe.title}</h2>
    <p class="recipe-dialog-lead">${recipe.description}</p>
    <div class="recipe-dialog-columns">
      <section><h3>Ingredientes base</h3><ul class="recipe-ingredients">${recipe.ingredients.map(([quantity, unit, name]) => `<li><strong>${formatQuantity(quantity)} ${unit}</strong> ${name}</li>`).join('')}</ul></section>
      <section><h3>Recorrido orientativo</h3><ol class="recipe-steps">${recipe.steps.map((step) => `<li>${step}</li>`).join('')}</ol></section>
    </div>
    <p class="notice">Temperatura y tiempo son referencias de partida. El tamaño de las piezas, el molde y tu horno pueden exigir ajustes. Comprueba siempre el punto de cocción.</p>
    <div class="result-actions"><button class="button" type="button" data-recipe-scale="${recipe.id}">Llevar al escalador</button><button class="button button--quiet" type="button" data-recipe-favorite="${recipe.id}" aria-pressed="${favorite}">${favorite ? '★ Guardada' : '☆ Guardar favorita'}</button></div>`;
}

function transferRecipe(id) {
  const recipe = recipes.find((item) => item.id === id);
  if (!recipe) return;
  const payload = {
    title: recipe.title,
    lines: recipe.ingredients.map(([quantity, unit, name]) => `${formatMachineQuantity(quantity)} ${unit} ${name}`)
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
  if (feedback) feedback.textContent = `Receta cargada desde Ideas: ${payload.title}. Revisa las cantidades antes de escalar.`;
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

function categoryLabel(category) {
  return category === 'pan' ? 'Pan y masas' : category === 'salado' ? 'Salado' : 'Dulce';
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatQuantity(value) {
  return new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 }).format(value);
}

function formatMachineQuantity(value) {
  return Number.isInteger(value) ? String(value) : String(value).replace(',', '.');
}

function htmlToElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}
