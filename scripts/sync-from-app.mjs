// Trae a `shared/` las copias de lo que la web publica y nace en el repositorio de la app (ADR-0029 de la app):
// la política de privacidad (su única fuente sigue en la app), los tokens de diseño, los títulos de las ARB y las
// fuentes con su licencia. También comprueba que el nombre de `identity.yaml` es el de la app (P7).
//
//   node scripts/sync-from-app.mjs            (la app en ../Una)
//   node scripts/sync-from-app.mjs /ruta/a/Una
//
// El archivo de avisos de terceros no se trae de aquí: sale del trabajo de publicación de la app (artefacto
// `third-party-notices`) y se copia a mano en `third-party-notices.txt` (docs/release-checklist.md).
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { readIdentity } from "../build.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const app = resolve(process.argv[2] ?? join(ROOT, "../Una"));
const shared = join(ROOT, "shared");

const FILES = [
  ["docs/legal/privacy-policy.md", "privacy-policy.md"],
  ["design/tokens.json", "tokens.json"],
  ["app/lib/l10n/app_es.arb", "app_es.arb"],
  ["app/lib/l10n/app_en.arb", "app_en.arb"],
];
const FONTS = ["archivo", "space_mono"];

const fail = (msg) => {
  console.error(`sync: ${msg}`);
  process.exit(1);
};

if (!existsSync(join(app, "app/identity.yaml"))) fail(`no encuentro la app en ${app} (pasa su ruta como argumento)`);

const appId = readIdentity(readFileSync(join(app, "app/identity.yaml"), "utf8"));
const webId = readIdentity(readFileSync(join(ROOT, "identity.yaml"), "utf8"));
for (const key of ["displayName", "wordmark"]) {
  if (appId[key] !== webId[key]) fail(`identity.yaml: «${key}» es «${webId[key]}» y en la app es «${appId[key]}»; cámbialo a mano`);
}

mkdirSync(shared, { recursive: true });
for (const [from, to] of FILES) cpSync(join(app, from), join(shared, to));
rmSync(join(shared, "fonts"), { recursive: true, force: true });
for (const dir of FONTS) cpSync(join(app, "app/assets/fonts", dir), join(shared, "fonts", dir), { recursive: true });

let commit = "desconocido";
try {
  commit = execFileSync("git", ["-C", app, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
} catch {}
writeFileSync(join(shared, "SOURCE.txt"), `Copias del repositorio de la app (svallev/una), commit ${commit}. No se editan aquí: node scripts/sync-from-app.mjs.\n`);
console.log(`sync: shared/ al día con la app (${commit.slice(0, 7)}).`);
