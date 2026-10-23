// GENERATED native TypeScript types — do not edit.


export interface AssistanceIdentity {
  application: string;
  workspace: string;
  supplier: string;
  generation: string;
}

export interface AssistanceAdvertisement {
  version: bigint;
  identity: AssistanceIdentity;
  share: string;
  label: string;
  capabilities: Uint8Array;
  expires: bigint;
}

export interface AssistanceRequest {
  version: bigint;
  identity: AssistanceIdentity;
  consumer: string;
  operation: string;
  deadline: bigint;
  token: string | null;
  epoch: bigint | null;
  payload: Uint8Array;
}

export interface AssistanceResult {
  status: string;
  token: string | null;
  epoch: bigint | null;
  expires: bigint | null;
  reason: string | null;
  payload: Uint8Array;
}

