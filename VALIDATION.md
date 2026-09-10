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

- Repositorio: <https://github.com/elvaropablo-oss/horno-exacto>.
- URL pública: <https://elvaropablo-oss.github.io/horno-exacto/>.
- SHA publicado: `f2c645353a5d65a3f4e50731dcf5a859884e3cce`.
- GitHub Actions/Pages: [ejecución 34536561950](https://github.com/elvaropablo-oss/horno-exacto/actions/runs/34536561950), completada correctamente para ese SHA. El primer intento previo compiló bien pero no pudo desplegar porque Pages aún no estaba activado; se configuró la fuente GitHub Actions y el siguiente workflow terminó correctamente.
- Comprobación pública posterior: portada y tres herramientas responden 200; todas las URLs del sitemap responden 200 con un H1 y canonical propia; CSS, JavaScript y favicon responden 200; Mi receta contiene `noindex,follow`; una ruta inexistente responde 404.
- `https://elvaropablo-oss.github.io/robots.txt` responde 404. No existe una regla de robots en la raíz compartida que bloquee el proyecto y no se publica un archivo ineficaz dentro de la subcarpeta.
- Colisión básica: `horno-exacto` estaba disponible en la cuenta y una búsqueda exacta del nombre no devolvió coincidencias evidentes. Esto no constituye una búsqueda legal de marca.

## Search Console y Analytics

- Propiedad URL-prefix creada y verificada mediante la etiqueta HTML real publicada en la portada. Está registrada y visible en GSC Wizard.
- Sitemap enviado el 10 de septiembre de 2026 a las 22:18 UTC. Search Console lo muestra pendiente, con 0 errores y 0 avisos en la última consulta.
- Seguimiento: portada, adaptar molde, escalar receta y porcentaje panadero añadidos al tracker. La inspección API se ejecutó correctamente para las cuatro; todas constan como `URL is unknown to Google`, sin rastreo previo.
- Solicitud manual: el intento desde Inspección de URLs devolvió «Cuota superada» y Google indicó probar al día siguiente. No existe confirmación de solicitud aceptada. Las cuatro URLs prioritarias quedan pendientes de solicitud manual cuando se reponga esa cuota; no se harán reintentos diarios sin cambios.
- GA4: desactivado. La cuenta conectada expone propiedades existentes de CosteCoche/CuántoMaterial, pero no un flujo confirmado para HornoExacto, y esta V1 aún no incorpora un consentimiento validado. No se reutilizó ni instaló un identificador ajeno.

## Límites conocidos

- Los factores geométricos no calculan tiempo, temperatura ni comportamiento de una receta.
- No hay moldes con hueco, paredes inclinadas o formas decorativas.
- No se convierten gramos y mililitros sin una densidad documentada.
- Los huevos y otras unidades discretas pueden quedar fraccionarios.
- El porcentaje panadero excluye prefermentos y masa madre.
- `localStorage` no sincroniza dispositivos y puede borrarse; el prefijo evita colisiones de nombres, pero las rutas de un mismo origen no ofrecen aislamiento de seguridad.
- La importación admite como máximo 1 MB y 200 ingredientes y solo conserva campos conocidos.
