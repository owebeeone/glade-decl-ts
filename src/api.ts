// GENERATED native TypeScript types — do not edit.

export type Shape = "value" | "log" | "message" | "stream" | "exchange" | "window";
export type Authority = "share" | "external";
export type DomainAnchor = "account" | "document" | "deployment";
export type ZoneKind = "commons" | "private";
export type RetentionPolicy = "latest" | "from_cursor" | "ttl";
export type ChangeKind = "refresh" | "delta";

export interface GladeId {
  id: string;
}

export interface Retention {
  policy: RetentionPolicy;
  ttl_ms: bigint | null;
}

export interface BindingDecl {
  glade_id: GladeId;
  shape: Shape;
  authority: Authority;
  source: string | null;
  domain: DomainAnchor;
  zone: ZoneKind;
  retention: Retention;
}

export interface AdvertisementRecord {
  binding: BindingDecl;
  package: string;
  grip_key: string;
}

export interface OriginMeta {
  origin: string;
  seq: bigint;
}

export interface ChangeEvent {
  glade_id: GladeId;
  shape: Shape;
  kind: ChangeKind;
  base_seq: bigint | null;
  origin_meta: OriginMeta | null;
  payload: Uint8Array;
}

export interface GladeIdManifest {
  package_id: string;
  grip_key: string;
  glade_id: GladeId;
}

