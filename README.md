# Una · web

Web de **Una**, la app que muestra una sola tarea a la vez: página de inicio (Vite, GSAP y Lenis) y las páginas de
contenido (Privacidad, Licencias de terceros, Ayuda y error), en español e inglés. La app vive en
[svallev/una](https://github.com/svallev/una); esta web salió de su carpeta `landing/` el 2026-11-18 (ADR-0029 de la app).

## Comandos

```bash
npm ci --ignore-scripts           # dependencias (solo las de package-lock.json, sin scripts)
node build.mjs                    # construye dist/
node check.mjs                    # comprueba dist/ (HTML, contraste, enlaces, textos, al día)
node --test test/*.test.mjs       # tests
node serve.mjs                    # sirve dist/ en local con las cabeceras de vercel.json
node scripts/sync-from-app.mjs    # trae de ../Una las copias de shared/ (o pasa la ruta de la app)
```

## Qué viene de la app

| Aquí | Fuente en la app | Cómo llega |
|---|---|---|
| `shared/privacy-policy.md` | `docs/legal/privacy-policy.md` (única fuente) | `node scripts/sync-from-app.mjs` |
| `shared/tokens.json` | `design/tokens.json` | ídem; `web-tokens.json` añade los de la web (grupo `landing`, `webContentMaxWidth`) |
| `shared/app_{es,en}.arb` | `app/lib/l10n/` (títulos de las páginas) | ídem |
| `shared/fonts/` | `app/assets/fonts/{archivo,space_mono}` | ídem |
| `identity.yaml` (`displayName`, `wordmark`) | `app/identity.yaml` | a mano; el script falla si no coinciden |
| `third-party-notices.txt` | artefacto `third-party-notices` del trabajo de publicación de la app | a mano (`docs/release-checklist.md`) |

`shared/` no se edita a mano: `shared/SOURCE.txt` dice de qué commit de la app vienen las copias.

## Publicación

Vercel construye cada push con su integración de Git (`vercel.json`: `npm ci --ignore-scripts`, `node build.mjs`,
`dist/` y las cabeceras). Hasta F6 la web es de pruebas: los huecos de identidad de la política son avisos. Al
publicar de verdad se define **`UNA_RELEASE=1`** en el proyecto de Vercel y un hueco hace fallar la construcción
(`docs/release-checklist.md`).

## Documentación

- `docs/specs/`: specs 025 (landing), 026 (páginas de contenido) y 027 (licencias por paquete), con su plan y tareas.
  La base de la web (CA-023-13 a 18) está en la spec 023 de la app.
- `docs/adr/`: ADR-0009 (histórico, sustituido por el ADR-0029 de la app), 0027 y 0028.
- Los principios (constitución P1–P12), el glosario y la política viven en la app.
