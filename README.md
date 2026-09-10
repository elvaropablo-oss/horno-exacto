# HornoExacto

HornoExacto es una web estática y gratuita para adaptar una receta a otro molde, escalar ingredientes y calcular fórmulas con porcentaje panadero. Los cálculos y el guardado se realizan en el navegador, sin cuenta ni servidor.

## Alcance V1

- Adaptación entre moldes redondos, cuadrados y rectangulares mediante área, altura ocupada y número de moldes.
- Escalado por factor, porciones o cantidad objetivo de un ingrediente.
- Porcentaje panadero desde harina conocida o masa total, con reparto entre varias harinas.
- Último proyecto guardado localmente, impresión y exportación/importación JSON validada.
- Guías, metodología, privacidad, HTML indexable, sitemap y datos estructurados.

Coste de receta, inventario, compra, prefermentos, masa madre y recomendaciones de cocción quedan fuera de esta versión.

## Desarrollo

Requiere Node.js 20 o posterior y no tiene dependencias de ejecución.

```bash
node scripts/build.mjs
node --test
node scripts/check.mjs
node scripts/serve.mjs
```

`node scripts/serve.mjs` sirve `dist/` en `http://127.0.0.1:4173/horno-exacto/`. `npm run verify` agrupa build, pruebas y auditoría cuando npm está disponible.

## Publicación

El workflow `quality-and-pages.yml` repite las comprobaciones, empaqueta `dist/` y publica GitHub Pages después de que el trabajo de calidad termine correctamente.

- Repositorio previsto: <https://github.com/elvaropablo-oss/horno-exacto>
- Web prevista: <https://elvaropablo-oss.github.io/horno-exacto/>

El estado exacto del despliegue, el SHA y las integraciones externas se registran en [VALIDATION.md](VALIDATION.md).

## Privacidad

Las claves de almacenamiento empiezan por `he:v1:`. No se instala analítica sin un identificador real y consentimiento probado. No introduzcas secretos ni datos sensibles en una receta o URL compartida.

## Estado de las otras candidaturas

TejeConMedida e ImprimeMedido siguen **sin comenzar**. Sus puertas de evidencia se conservan en [ROADMAP.md](ROADMAP.md); este repositorio no contiene código ni rutas de esas propuestas.

