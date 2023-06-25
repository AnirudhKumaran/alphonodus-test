/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocationWriteInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: LocationUpdate
// ====================================================

export interface LocationUpdate_locationUpdate {
  __typename: "LocationCommandResponse";
  resourceID: string;
}

export interface LocationUpdate {
  /**
   * Create a new or update an existing entity.
   * 
   * Equivalent to PUT /{tenant}/location/{id}
   */
  locationUpdate: LocationUpdate_locationUpdate | null;
}

export interface LocationUpdateVariables {
  locationUpdateId: string;
  tenant: string;
  requestBody: LocationWriteInput;
}
