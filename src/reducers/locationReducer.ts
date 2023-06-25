import * as actionTypes from "../actions/actionTypes"

const initialState: LocationState = {
    locations:[],
    locationCopy:[],
    selectedLocation:{
        id:"",
        address:"",
        name:"",
        alias:"",
        status:"",
        updatedAt:0,
        desc:""
    },
    selectedId:""
}

export default (state: LocationState = initialState,action: LocationAction) : LocationState => {

    switch(action.type){

        case actionTypes.CREATE_NEW_LOCATION:
            const newLocation: ILocation = {
                id: "",
                desc: "",
                name: "",
                alias: "",
                updatedAt: 0,
                address: "",
                status: ""
            }
            return {
                ...state,
                locations: state.locations.concat(newLocation)
            };

        case actionTypes.SET_ALL_LOCATIONS:
            // state.locations = action.locations
            state.locationCopy = action.locations
            return {...state,locations:action.locations}

        case actionTypes.FILTER_BY_ADDRESS:
            let filterType = action.payload.filterVal
            let tempLocations = state.locationCopy
            let filterLocation:ILocation[] = []

            if(filterType=="active"){
                filterLocation = tempLocations.filter((loc) => {return (loc.status && loc.status.toLowerCase()==="active")})
            }

            if(filterType=="inactive"){
                filterLocation = tempLocations.filter((loc) => {return (loc.status && loc.status.toLowerCase()!=="active") || loc.status===null})
            }

            if(filterType=="address"){
                filterLocation = tempLocations.filter((loc) => {return loc.address===null})
            }

            if(filterType=="alias"){
                filterLocation = tempLocations.filter((loc) => {return loc.alias===null})
            }

            return {...state,locations:filterLocation}

        case actionTypes.SET_LOCATION_ID:
            let idSelected = action.payload
            return {...state,selectedId:idSelected}

        case actionTypes.GET_LOCATION:
            let getLocation = action.location
            return {...state,selectedLocation:getLocation}

        case actionTypes.RESET_LOCATION:
            let resetLocation = {
                id:"",
                address:"",
                name:"",
                alias:"",
                status:"",
                updatedAt:0,
                desc:""
            }
            let resetId = ""
            return {...state,selectedLocation:resetLocation,selectedId:resetId}

        default:
            return state;

    }

}