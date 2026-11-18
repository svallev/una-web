# Lista de publicación de la web

La parte de la web de la lista cerrada de F6 de la app (`/release-checklist` y la fila de F6 de `docs/PLAN.md` en
`svallev/una`; los números entre paréntesis son los de esa lista). Nada se despliega con dominio propio sin
confirmación del propietario.

1. **Copias al día (2, 6):** `node scripts/sync-from-app.mjs` desde el commit de la app que se publica, con la
   política ya sin huecos (`[RESPONSABLE]`, `[FECHA]`, `[WEB]`) y con la revisión legal anotada. `shared/SOURCE.txt`
   dice de qué commit vienen.
2. **Contacto (2):** `contactEmail` en `identity.yaml` (rellena `[CONTACTO]`/`[CONTACT]` en la política, la Ayuda y
   el pie).
3. **Vercel (4, 13):** proyecto `una-web` con el dominio definitivo (PD-2) y la variable **`UNA_RELEASE=1`** en
   producción (con ella, un hueco de identidad hace fallar la construcción). Comprobar las cabeceras reales con
   `curl -sI` a `/`, `/no-existe`, `/lang.js` y `/third-party-notices.txt` (`/` con `script-src 'self'` y
   `style-src 'self' 'unsafe-inline'`; `/(.+)` la estricta, con Trusted Types y `nosniff`). Anotar el plazo de los
   registros de Vercel en la política si el panel lo da.
4. **Avisos de terceros (7):** `third-party-notices.txt` es el del trabajo de publicación (modo estricto) de la
   versión que se entrega: `gh run download <id> -R svallev/una -n third-party-notices -D <carpeta vacía>`, con su
   cabecera `Versión: X.Y.Z+N`. `web-notices.txt` con las versiones de GSAP y Lenis que se publican.
5. **Tiendas (12):** al publicar cada ficha, su dirección en `identity.yaml` (`googlePlayUrl`, `appStoreUrl`) y la
   entradilla del cierre a la variante aprobada (spec 025 §7). Insignias oficiales según `docs/specs/025-…/plan.md`
   §8 (P-025-1, releer las normas; Q-025-3). La página promete iOS: si se descarta, quitar el rótulo de App Store.
6. **Accesibilidad (10):** repetir sobre la web publicada las casillas aceptadas sin verificar en la 023 (TalkBack con
   Chrome, C-023-3 y C-023-4).
7. **Direcciones (1):** las tres de `app/identity.yaml` de la app (`/privacy`, `/licenses`, `/help`) responden en el
   dominio publicado.
