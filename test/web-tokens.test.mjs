// Contraste de los fondos de la página de inicio (spec 025, CA-025-14 y 15; plan §6.2). Antes lo comprobaba
// `tools/validate-tokens.mjs` de la app (§4e); los tokens `landing` viven ahora en web-tokens.json (ADR-0029 de la app).
//   - texto (≥ 4,5:1): paper sobre los magentas e ink sobre orange y yellow;
//   - titular (texto grande, ≥ 3:1): palette.classic.0 sobre los magentas y landing.magenta sobre yellow;
//   - no textual (≥ 3:1): el anillo de foco y los bordes de tinta sobre los cuatro fondos.
// Una sola salvedad, con nombre (propietario, 2026-11-13, sin excepción de P6): paperFiber sobre orange, 2,31:1.
// Si llega a 3:1, el test falla para que se quite de aquí.
import assert from "node:assert/strict";
import { test } from "node:test";
import { defaultPaths, readTokens } from "../build.mjs";

const tokens = readTokens(defaultPaths());
const hex = (v) => {
  const m = /^#([0-9a-f]{6})$/i.exec(v ?? "");
  assert.ok(m, `no es un color hex: ${v}`);
  return [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16));
};
const lum = ([r, g, b]) => {
  const f = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const L = (k) => hex(tokens.landing?.[k]?.$value);
const [magenta, magentaDeep, orange, yellow] = ["magenta", "magentaDeep", "orange", "yellow"].map(L);
const paper = hex(tokens.color.paper.$value);
const ink = hex(tokens.color.ink.$value);
const fiber = hex(tokens.color.paperFiber.$value);
const note = hex(tokens.palette.classic[0].$value);

const cases = [];
for (const [n, bg] of [["magenta", magenta], ["magentaDeep", magentaDeep]]) {
  cases.push([`texto paper / ${n}`, paper, bg, 4.5], [`palabra destacada palette.classic.0 / ${n}`, note, bg, 3], [`anillo de foco paper / ${n}`, paper, bg, 3]);
}
for (const [n, bg] of [["orange", orange], ["yellow", yellow]]) {
  cases.push([`texto ink / ${n}`, ink, bg, 4.5], [`anillo de foco ink / ${n}`, ink, bg, 3]);
}
for (const [n, bg] of [["magenta", magenta], ["magentaDeep", magentaDeep], ["orange", orange], ["yellow", yellow]]) {
  cases.push([`borde de tinta ink / ${n}`, ink, bg, 3]);
}
cases.push(["palabra destacada landing.magenta / yellow", magenta, yellow, 3]);

for (const [name, fg, bg, min] of cases) {
  test(`CA-025-14: ${name} ≥ ${min}:1`, () => {
    const r = ratio(fg, bg);
    assert.ok(r >= min, `${r.toFixed(2)} < ${min}`);
  });
}

test("CA-025-15: la salvedad paperFiber / orange sigue haciendo falta (< 3:1)", () => {
  const r = ratio(fiber, orange);
  assert.ok(r < 3, `${r.toFixed(2)} ≥ 3: quita la salvedad de este test`);
});

test("webContentMaxWidth sale de web-tokens.json (spec 026)", () => {
  assert.equal(tokens.size.webContentMaxWidth.$value.value, 1120);
});
