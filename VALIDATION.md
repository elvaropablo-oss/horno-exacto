# Validación técnica

Última actualización: 11 de septiembre de 2026.

## Automatizada

- Estado local: 14/14 pruebas unitarias aprobadas; sintaxis de 14 archivos JavaScript comprobada; build y auditoría aprobados.
- Casos matemáticos: áreas de tres formas, factor 20→24 cm = 1,44, rectángulo 20×30→30×40 = 2, escalado, fracciones y porcentaje panadero 1000/65/2/1 = 1680 g.
- Casos inválidos: ceros, forma no admitida, suma de harinas distinta de 100 %, proyecto JSON incompatible, totales inválidos y entradas no reconocibles.
- Auditoría generada: un H1 por página, título, descripción, canonical, JSON-LD parseable, referencias locales existentes y sitemap sin rutas privadas ni 404.

## Manual y navegador

- Navegador: molde circular 20→24 cm produjo 1,44 y transfirió el factor; 250 g produjo 360 g.
- Escalador: el ingrediente objetivo de fila 1 produjo el factor 2 y 250 g produjo 500 g; “al gusto” se conservó sin multiplicación.
- Panadero: los modos desde harina, masa total y pesos conocidos recuperaron 1000 g de harina, 1680 g totales, 420 g por pieza y porcentajes 100/65/2/1.
- Persistencia: el proyecto sobrevivió a la navegación y apareció en Mi receta. La validación de importación JSON y el fallo de cuota se cubrieron con pruebas unitarias; el selector de archivos se comprobó visualmente, pero la automatización disponible no pudo adjuntar un archivo local.
- Revisión visual: capturas en marcos reales de 360 y 390 px y capturas de 768 y 1280 px; se corrigió la navegación móvil para apilar cabecera y enlaces. No se observó desbordamiento del contenido.
- Rutas locales: 11 páginas públicas/privadas y sitemap respondieron 200; una ruta inexistente respondió 404 con la página propia.
- Peso total de los 21 archivos generados: 82.856 bytes sin compresión, por debajo del presupuesto inicial de 200 KB.

## Despliegue

- Repositorio: pendiente de crear.
- URL pública: pendiente de publicar.
- SHA publicado: pendiente.
- GitHub Actions/Pages: pendiente.
- Comprobación pública posterior: pendiente.
- `https://elvaropablo-oss.github.io/robots.txt`: pendiente de comprobar; no se publica un `robots.txt` ineficaz dentro de la subcarpeta.

## Search Console y Analytics

- Propiedad de Search Console, sitemap y solicitudes: pendientes de comprobar con acceso real después del despliegue.
- GA4: desactivado. No se dispone todavía de un ID de flujo confirmado ni de un mecanismo de consentimiento validado.

## Límites conocidos

- Los factores geométricos no calculan tiempo, temperatura ni comportamiento de una receta.
- No hay moldes con hueco, paredes inclinadas o formas decorativas.
- No se convierten gramos y mililitros sin una densidad documentada.
- Los huevos y otras unidades discretas pueden quedar fraccionarios.
- El porcentaje panadero excluye prefermentos y masa madre.
- `localStorage` no sincroniza dispositivos y puede borrarse; el prefijo evita colisiones de nombres, pero las rutas de un mismo origen no ofrecen aislamiento de seguridad.
- La importación admite como máximo 1 MB y 200 ingredientes y solo conserva campos conocidos.
