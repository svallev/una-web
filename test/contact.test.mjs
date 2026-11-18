// El contacto publicado (ADR-0029 de la app): `contactEmail` de identity.yaml rellena [CONTACTO] / [CONTACT].
import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { join } from "node:path";
import { build, fillContact, readIdentity } from "../build.mjs";
import { checkSite } from "../check.mjs";
import { edit, read, world } from "./support.mjs";

let w;
before(() => {
  w = world();
  edit(w.paths.identity, (t) => `${t}\ncontactEmail: "hola@ejemplo.org"\n`);
});
after(() => w.cleanup());

test("fillContact: enlace en Markdown, texto suelto fuera, sin tocar los demás huecos", () => {
  const id = { contactEmail: "hola@ejemplo.org" };
  assert.equal(fillContact("a [CONTACTO] b [FECHA]", id, { markdown: true }), "a [hola@ejemplo.org](mailto:hola@ejemplo.org) b [FECHA]");
  assert.equal(fillContact("Contact: [CONTACT]", id, { markdown: false }), "Contact: hola@ejemplo.org");
  assert.equal(fillContact("Contacto: [CONTACTO]", {}, { markdown: false }), "Contacto: [CONTACTO]");
  assert.throws(() => fillContact("x", { contactEmail: "no es correo" }, { markdown: false }), /contactEmail/);
});

test("con contactEmail no queda el hueco del contacto en ninguna página y la comprobación pasa", () => {
  const { warnings } = build(w.paths, { env: {} });
  assert.ok(!warnings.some((m) => /CONTACT/.test(m)), warnings.join("\n"));
  for (const file of ["privacy/index.html", "help/index.html", "licenses/index.html", "404.html"]) {
    const html = read(join(w.dist, file));
    assert.ok(!/\[CONTACTO?\]/.test(html), file);
    assert.ok(html.includes("hola@ejemplo.org"), file);
  }
  assert.ok(read(join(w.dist, "help/index.html")).includes('href="mailto:hola@ejemplo.org"'));
  assert.equal(readIdentity(read(w.paths.identity)).contactEmail, "hola@ejemplo.org");
  assert.deepEqual(checkSite(w.paths).errors ?? [], []);
});
