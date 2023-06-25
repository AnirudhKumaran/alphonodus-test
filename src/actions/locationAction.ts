import * as actionTypes from "./actionTypes";

export function createLocation(location: ILocation)  {
    return {
        type: actionTypes.CREATE_NEW_LOCATION,
        location
    }
}

export function setLocations(locations: ILocation[]) {
    return {
        type: actionTypes.SET_ALL_LOCATIONS,
        locations
    }
}

export function filterByAddress(payload: any){
    return {
        type: actionTypes.FILTER_BY_ADDRESS,
        payload
    }
}

export function getLocation(location: ILocation){
    return {
        type: actionTypes.GET_LOCATION,
        location
    }
}

export function setLocationId(payload: any){
    return {
        type: actionTypes.SET_LOCATION_ID,
        payload
    }
}

export function resetLocation(payload: any){
    return {
        type: actionTypes.RESET_LOCATION,
        payload
    }
}