/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderBy11, Order12 } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: LocationList
// ====================================================

export interface LocationList_locationList_resources {
  __typename: "Location";
  id: string;
  description: string | null;
  alias: string | null;
  name: string;
  updatedAt: number | null;
  address: string | null;
  status: string | null;
}

export interface LocationList_locationList {
  __typename: "LocationQueryListResponse";
  resources: (LocationList_locationList_resources | null)[] | null;
}

export interface LocationList {
  /**
   * Get a list of entities.
   * 
   * Equivalent to GET /{tenant}/location/
   */
  locationList: LocationList_locationList | null;
}

export interface LocationListVariables {
  tenant: string;
  limit?: number | null;
  orderBy?: OrderBy11 | null;
  order?: Order12 | null;
}
