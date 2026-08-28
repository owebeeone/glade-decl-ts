// glade-decl — the glade declaration surface, as generated TypeScript types.
//
// The TypeScript rendering of the `glade-decl` contract (a taut schema): the
// generated native types for the declaration surface (GladeId, Shape,
// Authority, BindingDecl, AdvertisementRecord, ChangeEvent, …). A leaf package;
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
export const CONTRACT_VERSION = "99a04e0b960d03cbe92c0ec17321761eda860845";
