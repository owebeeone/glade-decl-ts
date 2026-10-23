import { expect, it } from "vitest";
import { assistanceIR, loadSchema, encode, decode } from "./assistance/index.ts";
import corpus from "./assistance/assistance.v1.json";
const schema = loadSchema(assistanceIR);
it("round-trips every assistance canonical vector", () => {
  for (const vector of Object.values(corpus)) {
    const bytes = Uint8Array.from(vector.cbor.match(/../g)!.map(s => parseInt(s, 16)));
    expect(encode(schema, vector.message, decode(schema, vector.message, bytes))).toEqual(bytes);
  }
});
it("refuses malformed assistance envelopes", () => {
  expect(() => decode(schema, "AssistanceRequest", new Uint8Array([0xa0]))).toThrow();
});
