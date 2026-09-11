import { breadcrumbs, hero, linkButton } from '../templates/site.mjs';

const recipeSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Ideas de recetas para horno',
  description: 'Ideas para hornear filtrables por tipo, tiempo, dificultad e ingredientes, con favoritos y envío de cantidades al escalador.',
  url: 'https://elvaropablo-oss.github.io/horno-exacto/recetas/',
  inLanguage: 'es-ES',
  isPartOf: {
    '@type': 'WebSite',
    name: 'HornoExacto',
    url: 'https://elvaropablo-oss.github.io/horno-exacto/'
  }
};

export const recipePages = [
  {
    path: 'recetas',
    tool: 'recipes',
    title: 'Ideas de recetas para horno según tiempo e ingredientes | HornoExacto',
    h1: 'Ideas para decidir qué hornear hoy',
    description: 'Busca ideas de recetas para horno por ingredientes, tiempo, dificultad o tipo. Guarda favoritas y envía cantidades al escalador de HornoExacto.',
    schema: recipeSchema,
    content: `${breadcrumbs([{ label: 'Inicio', path: '' }, { label: 'Recetas', path: 'recetas/' }])}
      ${hero('Inspiración práctica', 'Ideas para decidir qué hornear hoy', 'Filtra por lo que tienes en casa, el tiempo disponible o el tipo de receta. Guarda favoritas en este dispositivo y lleva sus cantidades al escalador.', '<button class="button" type="button" data-recipe-surprise>Sorpréndeme</button><button class="button button--quiet" type="button" data-recipe-show-favorites>Ver favoritas</button>')}

      <section class="section recipe-discovery" aria-labelledby="recipe-filter-title">
        <div class="section-heading"><h2 id="recipe-filter-title">Encuentra una idea que encaje</h2><p>Las fichas son bases orientativas para inspirarte. Ajusta ingredientes y comprueba siempre el punto de cocción de tu receta.</p></div>
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

      <section class="section split recipe-explainer"><div><h2>De una idea a tus cantidades</h2><ol class="steps"><li>Abre una ficha y revisa la base de ingredientes.</li><li>Envía la receta al escalador con un toque.</li><li>Cambia porciones o aplica el factor de tu molde sin copiar las cantidades a mano.</li></ol></div><aside class="sample-card"><p class="metric-label">Todo conectado</p><p>Idea → ingredientes → escalador → molde</p><p class="big-number">1 flujo</p><p>Los favoritos y la receta transferida se guardan solo en tu navegador.</p></aside></section>

      <section class="section prose"><h2>Cómo están planteadas estas ideas</h2><p>La selección cubre preparaciones habituales de horno y está pensada como punto de partida, no como sustituto de una receta probada. Los tiempos y temperaturas dependen del tamaño, del horno y de la formulación concreta.</p><h2>¿Ya tienes una receta?</h2><p>Si no necesitas inspiración y ya conoces tus ingredientes, ve directamente a ${linkButton('escalar-receta/', 'Escalar mi receta', true)}.</p></section>

      <dialog class="recipe-dialog" data-recipe-dialog aria-labelledby="recipe-dialog-title">
        <div data-recipe-dialog-content></div>
        <form method="dialog" class="recipe-dialog-close"><button class="button button--quiet" type="submit">Cerrar</button></form>
      </dialog>`
  }
];
