// Corpus byte-parity gate for the TypeScript rendering.
//
// The pinned golden corpus (decl.v0.json) is the contract oracle. This crate's
// codec is an INDEPENDENT reimplementation of the deterministic-CBOR wire (not
// Python's) — so reproducing these bytes is a genuine cross-language conformance
// proof: every vector decodes from the committed bytes and re-encodes to the
// byte-identical bytes through the IR-driven codec, and round-trips.

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadSchema } from "./schema.ts";
import { decode, encode } from "./codec.ts";

const here = fileURLToPath(new URL(".", import.meta.url));
const ir = JSON.parse(readFileSync(here + "glade_decl.ir.json", "utf8"));
const golden: Record<string, { message: string; cbor: string }> = JSON.parse(
  readFileSync(here + "decl.v0.json", "utf8"),
);
const schema = loadSchema(ir);

function unhex(s: string): Uint8Array {
  const b = new Uint8Array(s.length / 2);
  for (let i = 0; i < b.length; i++) b[i] = parseInt(s.slice(i * 2, i * 2 + 2), 16);
  return b;
}
function hex(b: Uint8Array): string {
  return Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
}

describe("glade-decl corpus byte-parity", () => {
  it("has vectors", () => expect(Object.keys(golden).length).toBeGreaterThan(0));

  for (const [name, entry] of Object.entries(golden)) {
    it(name, () => {
      const raw = unhex(entry.cbor);
      const value = decode(schema, entry.message, raw);
      expect(hex(encode(schema, entry.message, value))).toBe(entry.cbor);
      // decode is stable: re-decoding the re-encoded bytes yields an equal value
      expect(decode(schema, entry.message, encode(schema, entry.message, value)))
        .toEqual(value);
    });
  }
});
