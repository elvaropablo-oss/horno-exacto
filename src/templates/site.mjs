import { site } from '../../site.config.mjs';

const base = site.basePath;
const googleAnalyticsTag = `  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-EL1YW63SXD"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    let analyticsStorage = 'denied';
    try { if (localStorage.getItem('he:v1:analytics-consent') === 'granted') analyticsStorage = 'granted'; } catch {}
    gtag('consent', 'default', { analytics_storage: analyticsStorage, ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    gtag('js', new Date());
    gtag('config', 'G-EL1YW63SXD');
  </script>`;

export function renderPage(page) {
  const canonical = `${site.origin}${base}${page.path ? `${page.path}/` : ''}`;
  const pageClass = page.path ? page.path.replaceAll('/', '-') : 'home';
  const robots = page.noindex ? '<meta name="robots" content="noindex,follow">' : '';
  const schema = JSON.stringify(page.schema || defaultSchema(page, canonical)).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="es">
<head>
${googleAnalyticsTag}
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  ${page.path === '' ? `<meta name="google-site-verification" content="${site.googleSiteVerification}">` : ''}
  ${robots}
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="${base}assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${base}assets/site.css">
  <link rel="stylesheet" href="${base}assets/recipes.css">
  <script type="application/ld+json">${schema}</script>
  <script type="module" src="${base}assets/app.js"></script>
  <script type="module" src="${base}assets/tools/recipe-ideas.js"></script>
</head>
<body class="page--${pageClass}"${page.tool ? ` data-tool="${page.tool}"` : ''}>
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <header class="site-header">
    <a class="brand" href="${base}" aria-label="HornoExacto, inicio">
      <svg class="brand-mark" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="17"/><circle cx="22" cy="22" r="6"/><path d="M22 2v7M42 22h-7M22 42v-7M2 22h7"/></svg>
      <span>Horno<strong>Exacto</strong></span>
    </a>
    <nav aria-label="Principal">
      ${navLink('herramientas/', 'Herramientas', page.path === 'herramientas' || Boolean(page.tool && !['mi-receta', 'recetas'].includes(page.path)))}
      ${navLink('recetas/', 'Recetas', page.path === 'recetas')}
      ${navLink('guias/medir-moldes/', 'Guías', page.path.startsWith('guias/'))}
      ${navLink('mi-receta/', 'Mi receta', page.path === 'mi-receta')}
    </nav>
  </header>
  <main id="contenido">${page.content}</main>
  <footer class="site-footer">
    <p><strong>HornoExacto</strong> calcula proporciones. El resultado culinario también depende de la receta, el molde y el horno.</p>
    <nav aria-label="Información"><a href="${base}recetas/">Ideas de recetas</a><a href="${base}metodologia/">Metodología</a><a href="${base}sobre/">Sobre el proyecto</a><a href="${base}privacidad/">Privacidad</a></nav>
  </footer>
  <aside class="consent-banner" data-consent-banner aria-label="Preferencias de analítica" hidden>
    <div><strong>Analítica opcional</strong><p>Google Analytics nos ayuda a entender qué herramientas resultan útiles. Solo se activa si aceptas.</p></div>
    <div class="consent-actions"><button class="button" type="button" data-consent="granted">Aceptar analítica</button><button class="button button--quiet" type="button" data-consent="denied">Rechazar</button></div>
  </aside>
</body>
</html>`;
}

function defaultSchema(page, canonical) {
  const data = {
    '@type': page.tool ? 'WebApplication' : 'WebPage',
    name: page.h1,
    description: page.description,
    url: canonical,
    inLanguage: 'es-ES'
  };
  if (page.tool) {
    data.applicationCategory = 'UtilitiesApplication';
    data.operatingSystem = 'Cualquier navegador moderno';
    data.offers = { '@type': 'Offer', price: '0', priceCurrency: 'EUR' };
  }
  const crumbs = [{ name: 'Inicio', item: `${site.origin}${base}` }];
  if (page.path) crumbs.push({ name: page.h1, item: canonical });
  return {
    '@context': 'https://schema.org',
    '@graph': [data, {
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem', position: index + 1, name: crumb.name, item: crumb.item
      }))
    }]
  };
}

export function breadcrumbs(items) {
  return `<nav class="breadcrumbs" aria-label="Migas de pan">${items.map((item, index) => index === items.length - 1 ? `<span aria-current="page">${item.label}</span>` : `<a href="${base}${item.path}">${item.label}</a>`).join('<span aria-hidden="true">/</span>')}</nav>`;
}

export function hero(kicker, title, lead, actions = '') {
  return `<section class="hero"><p class="hero-note">${kicker}</p><div class="hero-copy"><h1>${title}</h1><p class="lead">${lead}</p>${actions ? `<div class="hero-actions">${actions}</div>` : ''}</div></section>`;
}

export const linkButton = (path, label, quiet = false) => `<a class="button${quiet ? ' button--quiet' : ''}" href="${base}${path}">${label}</a>`;

function navLink(path, label, active) {
  return `<a href="${base}${path}"${active ? ' aria-current="page"' : ''}>${label}</a>`;
}
