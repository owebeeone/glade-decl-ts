# glade-decl (TypeScript)

The TypeScript **rendering** of the [`glade-decl`](https://github.com/owebeeone/glade-decl)
contract: generated native types for the glade declaration surface (`GladeId`,
`Shape`, `Authority`, `BindingDecl`, `ShapeProfileDecl`, `ChangeEvent`, …).
A leaf package — grip-core imports these types (they erase at build) without
importing glade or glial.

Per taut's design the deterministic-CBOR codec is IR-driven at runtime; the
vendored runtime (`codec.ts` / `schema.ts` / `cbor.ts`) drives it from the pinned
`glade_decl.ir.json` when a binder needs bytes. `api.ts` and the runtime are
GENERATED — do not edit.

## Contract v1

The package is `@owebeeone/glade-decl`. Outside the gwz workspace, depend on the
published release by version, `"@owebeeone/glade-decl": "^0.1.0"` in the
consumer's `package.json` (`pnpm add @owebeeone/glade-decl@^0.1.0`).

A consumer in the gwz workspace depends on this checkout by path instead,
`"@owebeeone/glade-decl": "file:../glade-decl-ts"`, as glial does. grip-core
declares `^0.1.0` and maps it back to this checkout with a `pnpm.overrides`
entry. The checkout's `main`, `types` and `exports` name `src/index.ts`, so a
path consumer needs no build; the published package's name `dist/`, because
pnpm applies `publishConfig` when it packs.

It renders contract **v1**: `CONTRACT_VERSION` in `src/index.ts` pins glade-decl
commit `7d18cd3`.

- `AdvertisementRecord` is removed. v1 holds it out until GDL-029 (grok
  enumeration, still open) ratifies (R7(b)).
- Declared, not yet authorable: `BindingDecl.source` and the `external`
  authority it goes with, since no app-file token names a source (R5(b)); and
  the domain anchor (`DomainAnchor`), which no app-file token sets and the
  binder resolves.

Every member, and what an app file may write, is in the `README.md` of the
sibling `glade-decl` repository.

## Corpus gate

The pinned golden corpus (`decl.v1.json`, `CONTRACT_VERSION` in `index.ts`) is
the oracle. This crate's codec is an INDEPENDENT reimplementation of the wire, so
reproducing these bytes is a genuine cross-language conformance proof.

```sh
pnpm install
pnpm test       # src/corpus.test.ts — byte-parity over every vector
```

## Build and publish

```sh
pnpm build      # dist/: the "." entry point as ESM plus .d.ts
pnpm pack       # builds first (prepack), then packs with the dist entry points
```

`pnpm build` deletes `dist/` before `tsc` writes it, since `tsc` would
otherwise write through files that pnpm has hard-linked into consumers.
Publishing is `.github/workflows/publish.yml`, run by a published GitHub
release whose tag matches the version (`v0.1.0`). It publishes with the
`NPM_TOKEN` repository secret.

## Regenerate

From the `glade-decl` contract repo (a gwz sibling):

```sh
PYTHONPATH=../taut/src python3 -m taut.cli gen ir/glade_decl.taut.py \
    -o /tmp/g -l typescript --api-only --with-runtime   # api.ts + codec/cbor/schema
python3 corpus/build.py --ts-from /tmp/g/typescript     # them, the IR and the corpus -> ../glade-decl-ts/src/
```

`build.py` replaces each file instead of writing through it: pnpm hard-links
installed copies of this package into its consumers, so a write through an
existing file, as a `cp` onto it is, would rewrite every consumer's install.

Design: `glade-decl/dev-docs/DeclSurface.md`.
