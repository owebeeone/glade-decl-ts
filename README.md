# glade-decl (TypeScript)

The TypeScript **rendering** of the [`glade-decl`](https://github.com/owebeeone/glade-decl)
contract: generated native types for the glade declaration surface (`GladeId`,
`Shape`, `Authority`, `BindingDecl`, `AdvertisementRecord`, `ChangeEvent`, …).
A leaf package — grip-core imports these types (they erase at build) without
importing glade or glial.

Per taut's design the deterministic-CBOR codec is IR-driven at runtime; the
vendored runtime (`codec.ts` / `schema.ts` / `cbor.ts`) drives it from the pinned
`glade_decl.ir.json` when a binder needs bytes. `api.ts` and the runtime are
GENERATED — do not edit.

## Corpus gate

The pinned golden corpus (`decl.v0.json`, `CONTRACT_VERSION` in `index.ts`) is
the oracle. This crate's codec is an INDEPENDENT reimplementation of the wire, so
reproducing these bytes is a genuine cross-language conformance proof.

```sh
npm install
npm test        # src/corpus.test.ts — byte-parity over every vector
```

## Regenerate

From the `glade-decl` contract repo (a gwz sibling):

```sh
PYTHONPATH=../taut/src python3 -m taut.cli gen ir/glade_decl.taut.py \
    -o /tmp/g -l typescript --api-only --with-runtime   # api.ts + codec/cbor/schema
cp /tmp/g/typescript/*.ts ../glade-decl-ts/src/
cp ir/glade_decl.ir.json corpus/decl.v0.json ../glade-decl-ts/src/
```

Design: `glade-decl/dev-docs/DeclSurface.md`.
