/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LocationRead
// ====================================================

export interface LocationRead_locationRead_resource {
  __typename: "Location";
  id: string;
  description: string | null;
  alias: string | null;
  name: string;
  updatedAt: number | null;
  address: string | null;
  status: string | null;
}

export interface LocationRead_locationRead {
  __typename: "LocationQueryReadResponse";
  resource: LocationRead_locationRead_resource;
}

export interface LocationRead {
  /**
   * Get an entity by ID.
   * 
   * Equivalent to GET /{tenant}/location/{id}
   */
  locationRead: LocationRead_locationRead | null;
}

export interface LocationReadVariables {
  locationReadId: string;
  tenant: string;
}
