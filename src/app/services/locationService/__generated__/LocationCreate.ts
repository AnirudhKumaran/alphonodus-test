/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocationWriteInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: LocationCreate
// ====================================================

export interface LocationCreate_locationCreate {
  __typename: "LocationCommandResponse";
  resourceID: string;
}

export interface LocationCreate {
  /**
   * Create a new entity.
   * 
   * Equivalent to POST /{tenant}/location/
   */
  locationCreate: LocationCreate_locationCreate | null;
}

export interface LocationCreateVariables {
  requestBody: LocationWriteInput;
  tenant: string;
}
