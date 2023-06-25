import { gql } from "@apollo/client";

export const GET_ALL_LOCATIONS = gql`
query LocationList($tenant: String!, $limit: Int, $orderBy: OrderBy11, $order: Order12) {
    locationList(tenant: $tenant, limit: $limit, orderBy: $orderBy, order: $order) {
        resources{
            id
            description
            alias
            name
            updatedAt
            address
            status
        }
    }
}
`;

export const CREATE_NEW_LOCATION = gql`
    mutation LocationCreate($requestBody: LocationWriteInput!, $tenant: String!) {
        locationCreate(requestBody: $requestBody, tenant: $tenant) {
            resourceID
        }
    }
`

export const GET_LOCATION = gql`
    query LocationRead($locationReadId: String!, $tenant: String!) {
        locationRead(id: $locationReadId, tenant: $tenant) {
            resource{
                id
                description
                alias
                name
                updatedAt
                address
                status
            }
        }
    }
`

export const DELETE_LOCATION = gql`
    mutation LocationRemove($locationRemoveId: String!, $tenant: String!) {
        locationRemove(id: $locationRemoveId, tenant: $tenant) {
            resourceID
        }
    }
`

export const UPDATE_LOCATION = gql`
    mutation LocationUpdate($locationUpdateId: String!, $tenant: String!, $requestBody: LocationWriteInput!) {
        locationUpdate(id: $locationUpdateId, tenant: $tenant, requestBody: $requestBody) {
            resourceID
        }
    }
`