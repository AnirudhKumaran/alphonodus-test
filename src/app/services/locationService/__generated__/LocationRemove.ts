/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LocationRemove
// ====================================================

export interface LocationRemove_locationRemove {
  __typename: "LocationCommandResponse";
  resourceID: string;
}

export interface LocationRemove {
  /**
   * Delete an entity.
   * 
   * Equivalent to DELETE /{tenant}/location/{id}
   */
  locationRemove: LocationRemove_locationRemove | null;
}

export interface LocationRemoveVariables {
  locationRemoveId: string;
  tenant: string;
}
