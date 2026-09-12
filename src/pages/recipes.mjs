import { breadcrumbs, hero, linkButton } from '../templates/site.mjs';
import { recipes, categoryLabel } from '../js/data/recipes.js';
import { ingredientDensities, densitySource } from '../js/data/ingredient-densities.js';

const recipeCollectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Recetas de horno con cantidades escalables',
  description: 'Recetas para horno con cantidades base, raciones ajustables y acceso directo al escalador de ingredientes.',
  url: 'https://elvaropablo-oss.github.io/horno-exacto/recetas/',
  inLanguage: 'es-ES',
  isPartOf: {
    '@type': 'WebSite',
    name: 'HornoExacto',
    url: 'https://elvaropablo-oss.github.io/horno-exacto/'
  }
};

const collectionPage = {
  path: 'recetas',
  tool: 'recipes',
  title: 'Recetas para horno con cantidades por raciones | HornoExacto',
  h1: 'Recetas que puedes adaptar al número de personas',
  description: 'Busca recetas para horno, abre una ficha y cambia las raciones para recalcular los ingredientes automáticamente.',
  schema: recipeCollectionSchema,
  content: `${breadcrumbs([{ label: 'Inicio', path: '' }, { label: 'Recetas', path: 'recetas/' }])}
    ${hero('Recetas escalables', 'Recetas que puedes adaptar al número de personas', 'Cada receta parte de unas raciones concretas. Cambia el número de personas y HornoExacto recalcula todos los ingredientes manteniendo la proporción.', '<button class="button" type="button" data-recipe-surprise>Sorpréndeme</button><button class="button button--quiet" type="button" data-recipe-show-favorites>Ver favoritas</button>')}

    <section class="section recipe-discovery" aria-labelledby="recipe-filter-title">
      <div class="section-heading"><h2 id="recipe-filter-title">Encuentra una receta que encaje</h2><p>Filtra por ingredientes, tiempo, dificultad o tipo. Las cantidades que ves en cada ficha se pueden adaptar a las raciones que necesites.</p></div>
      <form class="recipe-filters" data-recipe-filters>
        <label>Buscar receta o ingrediente
          <input id="recipe-search" type="search" placeholder="Ej. chocolate, manzana, focaccia" autocomplete="off">
        </label>
        <label>¿Qué tienes en casa?
          <input id="recipe-pantry" type="search" placeholder="Ej. harina, huevos, plátano" autocomplete="off">
        </label>
        <label>Tipo
          <select id="recipe-category"><option value="">Todos</option><option value="dulce">Dulce</option><option value="pan">Pan y masas</option><option value="salado">Salado</option></select>
        </label>
        <label>Tiempo máximo
          <select id="recipe-time"><option value="0">Cualquiera</option><option value="30">30 min</option><option value="45">45 min</option><option value="60">1 hora</option><option value="90">1 h 30 min</option></select>
        </label>
        <label>Dificultad
          <select id="recipe-difficulty"><option value="">Cualquiera</option><option value="fácil">Fácil</option><option value="media">Media</option></select>
        </label>
        <label class="recipe-check"><input id="recipe-favorites-only" type="checkbox"> Solo favoritas</label>
        <div class="inline-actions recipe-filter-actions"><button class="button button--quiet" type="reset">Limpiar filtros</button><button class="button" type="button" data-recipe-surprise>Elegir una al azar</button></div>
      </form>
      <p class="recipe-status" data-recipe-status aria-live="polite"></p>
      <div class="recipe-grid" data-recipe-grid></div>
      <div class="empty-state recipe-empty" data-recipe-empty hidden><h2>No encuentro una coincidencia exacta</h2><p>Prueba a quitar un filtro o escribe menos ingredientes. Si indicas varios ingredientes, priorizamos recetas que coincidan con más de ellos.</p></div>
    </section>

    <section class="section split recipe-explainer"><div><h2>De una receta base a tus cantidades</h2><ol class="steps"><li>Abre una receta y elige cuántas personas o raciones necesitas.</li><li>Las cantidades se recalculan inmediatamente, sin cambiar las unidades.</li><li>Si quieres seguir editando, envíala al escalador de ingredientes o adapta después el molde.</li></ol></div><aside class="sample-card"><p class="metric-label">Ejemplo</p><p>Receta base para 8 personas → quieres 12</p><p class="big-number">× 1,5</p><p>200 g pasan a 300 g. El tiempo y la temperatura no se multiplican automáticamente.</p></aside></section>

    <section class="section split"><div><h2>¿La receta está en gramos y tú mides en mililitros?</h2><p>No existe una conversión universal: depende de la densidad del ingrediente. El nuevo conversor usa una densidad específica y deja visible el valor aplicado.</p>${linkButton('gramos-a-ml/', 'Convertir gramos y ml')}</div><aside class="sample-card"><p class="metric-label">Importante</p><p>100 g de agua ≈ 100 ml, pero 100 g de miel ocupan bastante menos volumen.</p><p>Para ingredientes secos, pesar suele ser más preciso que convertir por volumen.</p></aside></section>

    <section class="section prose"><h2>Cómo están planteadas estas recetas</h2><p>Son bases de trabajo pensadas para combinarse con las calculadoras de HornoExacto. El resultado real depende del horno, del tamaño del molde, de la temperatura de los ingredientes y de la técnica. Revisa siempre el punto de cocción y la seguridad alimentaria de los ingredientes que utilices.</p><h2>¿Ya tienes una receta?</h2><p>Si ya conoces tus ingredientes, ve directamente a ${linkButton('escalar-receta/', 'Escalar mi receta', true)}.</p></section>

    <dialog class="recipe-dialog" data-recipe-dialog aria-labelledby="recipe-dialog-title">
      <div data-recipe-dialog-content></div>
      <form method="dialog" class="recipe-dialog-close"><button class="button button--quiet" type="submit">Cerrar</button></form>
    </dialog>`
};

function formatQuantity(value) {
  return new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 }).format(value);
}

function recipeSchema(recipe) {
  const canonical = `https://elvaropablo-oss.github.io/horno-exacto/recetas/${recipe.id}/`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    url: canonical,
    inLanguage: 'es-ES',
    recipeCategory: categoryLabel(recipe.category),
    recipeYield: `${recipe.servings} raciones`,
    totalTime: `PT${recipe.minutes}M`,
    recipeIngredient: recipe.ingredients.map(([quantity, unit, name]) => `${formatQuantity(quantity)} ${unit} ${name}`),
    recipeInstructions: recipe.steps.map((text) => ({ '@type': 'HowToStep', text }))
  };
}

function recipeDetailPage(recipe) {
  const ingredients = recipe.ingredients.map(([quantity, unit, name]) => `<li data-recipe-ingredient data-base-quantity="${quantity}" data-unit="${unit}"><strong><span data-recipe-quantity>${formatQuantity(quantity)}</span> ${unit}</strong> ${name}</li>`).join('');
  const steps = recipe.steps.map((step) => `<li>${step}</li>`).join('');
  const equipment = recipe.equipment.map((item) => `<li>${item}</li>`).join('');
  return {
    path: `recetas/${recipe.id}`,
    title: `${recipe.title}: ingredientes por raciones | HornoExacto`,
    h1: recipe.title,
    description: `${recipe.title} con ingredientes medidos para ${recipe.servings} raciones y calculadora para adaptar automáticamente las cantidades a más o menos personas.`,
    schema: recipeSchema(recipe),
    content: `${breadcrumbs([{ label: 'Inicio', path: '' }, { label: 'Recetas', path: 'recetas/' }, { label: recipe.title, path: `recetas/${recipe.id}/` }])}
      ${hero(`${categoryLabel(recipe.category)} · ${recipe.minutes} min · ${recipe.temperature} °C`, recipe.title, recipe.description, `${linkButton('recetas/', 'Ver más recetas', true)}${linkButton('gramos-a-ml/', 'Gramos ↔ ml', true)}`)}
      <section class="section recipe-detail" data-recipe-detail="${recipe.id}" data-base-servings="${recipe.servings}">
        <div class="recipe-scale-panel"><div><p class="eyebrow">Ajustar cantidades</p><h2>¿Para cuántas personas?</h2><p>La receta base está calculada para <strong>${recipe.servings} raciones</strong>. Cambia la cifra y recalcularemos todos los ingredientes.</p></div><label>Raciones<input type="number" min="1" max="50" step="1" value="${recipe.servings}" data-recipe-servings inputmode="numeric"></label><p class="recipe-scale-factor" data-recipe-factor>Factor × 1</p></div>
        <div class="recipe-detail-grid">
          <section><h2>Ingredientes</h2><ul class="recipe-ingredients recipe-ingredients--detail">${ingredients}</ul><div class="result-actions"><button class="button" type="button" data-recipe-transfer="${recipe.id}">Llevar estas cantidades al escalador</button><button class="button button--quiet" type="button" data-recipe-favorite="${recipe.id}" aria-pressed="false">☆ Guardar favorita</button></div></section>
          <section><h2>Preparación</h2><ol class="recipe-steps">${steps}</ol><p class="notice">${recipe.temperature} °C y ${recipe.minutes} min son una referencia de partida. Cambiar la cantidad, el molde o el grosor puede cambiar el horneado; comprueba el punto de cocción.</p></section>
        </div>
      </section>
      <section class="section split recipe-equipment"><div><h2>Material que suele ser útil para esta receta</h2><ul>${equipment}</ul><p>Cuando haya programas de afiliación activos, HornoExacto podrá mostrar aquí opciones compatibles. La comisión nunca cambia la receta ni el orden de las recomendaciones.</p></div><aside class="sample-card"><p class="metric-label">Antes de comprar</p><p>Comprueba tamaño del molde, capacidad, material y medidas interiores.</p><p>${linkButton('adaptar-molde/', 'Comparar mi molde', true)}</p></aside></section>
      <section class="section prose"><h2>Cómo adaptar esta receta</h2><p>El selector de raciones aplica una regla de tres a todas las cantidades. No redondeamos en secreto los ingredientes discretos: si aparecen fracciones de huevo, decide si tu receta permite pesar huevo batido o si prefieres ajustar el factor.</p><p>Si necesitas cambiar de molde, usa primero la ${linkButton('adaptar-molde/', 'calculadora de moldes', true)} y después aplica el factor resultante al escalador.</p></section>`
  };
}

const densityOptions = ingredientDensities.map((item) => `<option value="${item.id}">${item.name}</option>`).join('');
const densityConverterPage = {
  path: 'gramos-a-ml',
  tool: 'density-converter',
  title: 'Convertir gramos a mililitros por ingrediente | HornoExacto',
  h1: 'Conversor de gramos a mililitros y de ml a gramos',
  description: 'Convierte gramos y mililitros usando la densidad específica de agua, leche, aceite, miel, harina, azúcar y otros ingredientes.',
  content: `${breadcrumbs([{ label: 'Inicio', path: '' }, { label: 'Gramos a ml', path: 'gramos-a-ml/' }])}
    ${hero('Conversión por densidad', 'Conversor de gramos a mililitros y de ml a gramos', 'Elige el ingrediente antes de convertir. Un mililitro no pesa lo mismo para todos los alimentos, por eso HornoExacto deja visible la densidad usada.')}
    <section class="tool-layout"><form id="density-converter-form" class="tool-card" novalidate><fieldset><legend>Conversión</legend><label>Dirección<select name="direction"><option value="g-to-ml">Gramos → mililitros</option><option value="ml-to-g">Mililitros → gramos</option></select></label><label>Cantidad<input name="amount" value="100" inputmode="decimal"></label><label>Ingrediente<select name="ingredient">${densityOptions}<option value="custom">Otro: introducir densidad</option></select></label><label data-custom-density-wrap hidden>Densidad <span>g/ml</span><input name="customDensity" value="1" inputmode="decimal"></label></fieldset><div class="error" data-density-error role="alert" hidden></div><button class="button" type="submit">Convertir</button></form><section id="density-converter-result" class="result-card" tabindex="-1" aria-live="polite" hidden></section></section>
    <section class="section prose"><h2>La fórmula</h2><p>Para pasar de gramos a mililitros: <strong>ml = gramos ÷ densidad</strong>. Para pasar de mililitros a gramos: <strong>gramos = ml × densidad</strong>.</p><h2>Por qué no usamos 1 g = 1 ml para todo</h2><p>Esa aproximación funciona razonablemente bien para el agua, pero no para miel, aceite, harina o azúcar. Además, las densidades aparentes de los ingredientes secos cambian con la compactación y la humedad.</p><h2>Fuente y precisión</h2><p>Las densidades son referencias culinarias aproximadas basadas principalmente en <a href="${densitySource.url}" target="_blank" rel="noopener noreferrer">${densitySource.name}</a>. Si necesitas precisión, pesa el ingrediente o usa la densidad indicada por su fabricante.</p><p>${linkButton('recetas/', 'Ver recetas escalables', true)}</p></section>`
};

export const recipePages = [collectionPage, ...recipes.map(recipeDetailPage), densityConverterPage];
