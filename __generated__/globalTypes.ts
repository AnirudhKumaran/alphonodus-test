/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Order12 {
  asc = "asc",
  desc = "desc",
}

export enum OrderBy11 {
  created = "created",
  updated = "updated",
}

export interface LocationTelecomInput {
  rank?: number | null;
  system?: string | null;
  use?: string | null;
  value?: string | null;
}

export interface LocationWriteInput {
  address?: string | null;
  alias?: string | null;
  description?: string | null;
  id?: string | null;
  managingOrganization?: string | null;
  name: string;
  npi?: string | null;
  partOf?: string | null;
  status?: string | null;
  tag?: string | null;
  taxId?: string | null;
  telecom?: (LocationTelecomInput | null)[] | null;
  tenant?: string | null;
  type?: string | null;
  updatedAt?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
