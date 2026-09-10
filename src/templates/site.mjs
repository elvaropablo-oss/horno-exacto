import { site } from '../../site.config.mjs';

const base = site.basePath;

export function renderPage(page) {
  const canonical = `${site.origin}${base}${page.path ? `${page.path}/` : ''}`;
  const robots = page.noindex ? '<meta name="robots" content="noindex,follow">' : '';
  const schema = JSON.stringify(page.schema || defaultSchema(page, canonical)).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  ${page.path === '' ? `<meta name="google-site-verification" content="${site.googleSiteVerification}">` : ''}
  ${robots}
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="${base}assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${base}assets/site.css">
  <script type="application/ld+json">${schema}</script>
  <script type="module" src="${base}assets/app.js"></script>
</head>
<body${page.tool ? ` data-tool="${page.tool}"` : ''}>
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <header class="site-header">
    <a class="brand" href="${base}" aria-label="HornoExacto, inicio"><span aria-hidden="true">◉</span> HornoExacto</a>
    <nav aria-label="Principal">
      <a href="${base}herramientas/">Herramientas</a>
      <a href="${base}guias/medir-moldes/">Guías</a>
      <a href="${base}mi-receta/">Mi receta</a>
    </nav>
  </header>
  <main id="contenido">${page.content}</main>
  <footer class="site-footer">
    <p><strong>HornoExacto</strong> calcula proporciones. El resultado culinario también depende de la receta, el molde y el horno.</p>
    <nav aria-label="Información"><a href="${base}metodologia/">Metodología</a><a href="${base}sobre/">Sobre el proyecto</a><a href="${base}privacidad/">Privacidad</a></nav>
  </footer>
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
  return `<section class="hero"><p class="eyebrow">${kicker}</p><h1>${title}</h1><p class="lead">${lead}</p>${actions ? `<div class="hero-actions">${actions}</div>` : ''}</section>`;
}

export const linkButton = (path, label, quiet = false) => `<a class="button${quiet ? ' button--quiet' : ''}" href="${base}${path}">${label}</a>`;
