# Glosario de la web (ES ⇄ EN)

Términos propios de la web, traídos del glosario de la app (`docs/glossary.md` de `svallev/una`, que manda para todo lo demás) el 2026-11-18 (ADR-0029 de la app).

| Español (docs/UI) | English (UI) | Código | Definición |
|---|---|---|---|
| Landing | Landing page | *(spec 025)* | La página de inicio de la web: cuenta la app en siete escenas y lleva a las tiendas. Sustituye a la página de inicio mínima de la 023; no es una de las tres «webs de la app». |
| Escena | Scene | — *(spec 025)* | Cada uno de los siete pasos de la landing, con su titular, su entradilla y su color de fondo. |
| Recorrido | Journey | — *(spec 025)* | El avance en profundidad de la landing ligado al scroll: los elementos vienen de frente y nos sobrepasan. Con «reducir movimiento» no existe y las escenas se leen una debajo de otra. |
| Versión apilada | Stacked version | `html:not(.fx)`, `pickMode` *(spec 025)* | La landing sin recorrido: las siete escenas una debajo de otra. Sale con «reducir movimiento», sin JavaScript (en español) o con menos de 540 px de alto. |
| Páginas de contenido | Content pages | `build.mjs` (`shell`, `chrome`), `src/site.css`, programa de idioma `src/lang.js` *(spec 026, ADR-0028)* | Las cuatro páginas de la web que no son la landing: Política de privacidad, Licencias de terceros, Ayuda y la página de error. Llevan la cabecera y el pie de la landing y un idioma cada vez (sin JavaScript, los dos). |
| Selector de idioma | Language switcher | botones `data-lang` (landing); `.langs a[hreflang]` con `role="button"` y `aria-pressed` (páginas de contenido) *(spec 025 y 026)* | Los controles ES / EN de la web (en la landing, en la cabecera; en las páginas de contenido, debajo de la cabecera, y se van con el scroll): cambian el idioma de la página y la elección se recuerda en ese navegador para toda la web. Sin JavaScript, en las páginas de contenido llevan a la mitad de cada idioma. |
| Índice (de la página) | On this page | `nav.toc`, `webOnThisPage`, `sectionAnchor` *(spec 026)* | Lista de enlaces a las secciones de la mitad de cada idioma, al principio de la Política de privacidad y de la Ayuda, bajo el título y la fecha: «En esta página» / «On this page». Cada sección tiene un ancla estable con el prefijo del idioma (`es-…`, `en-…`) sacada de su titular. |
| Grupo de avisos | Notice group | `<details>` de `/licenses` *(spec 027)* | Cada conjunto de avisos de terceros que comparten la misma cabecera (un paquete o varios) en la página de licencias: plegado, con su nombre y el número de avisos. Las cinco secciones `assets/…` son grupos propios. No cambia el texto legal. |
| Rótulo de tienda | Store label | `storesHtml` en `chrome.js` *(spec 025)* | El texto propio de la landing con el nombre de una tienda (App Store primero, luego Google Play) y «Muy pronto» si aún no hay dirección. Hasta F6 sustituye a las insignias oficiales de las tiendas. |
| Insignia de tienda | Store badge | — *(spec 025)* | La imagen oficial «Disponible en Google Play» o «Descárgalo en el App Store»; no se altera. |
