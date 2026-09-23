// glade-decl — the glade declaration surface, as generated TypeScript types.
//
// The TypeScript rendering of the `glade-decl` contract (a taut schema): the
// generated native types for the declaration surface (GladeId, Shape,
// Authority, BindingDecl, ShapeProfileDecl, ChangeEvent, …). A leaf package;
// grip-core imports these types (they erase at build) without importing glade
// or glial.
//
// Per taut's design the deterministic-CBOR codec is IR-driven at runtime; the
// vendored runtime (codec.ts / schema.ts / cbor.ts) drives it from the pinned
// `glade_decl.ir.json` when a binder needs bytes. `api.ts` and the runtime are
// GENERATED — do not edit.

// The declaration-surface types (type-only; erase at build for consumers).
export type * from "./api.ts";

// The pinned glade-decl contract commit this rendering was generated from.
export const CONTRACT_VERSION = "7d18cd3c92fac205e9c20160e78147c2573aae73";
