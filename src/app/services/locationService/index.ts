import { apolloClient } from "../../graphql";
import { LocationList } from "./__generated__/LocationList";
import { LocationCreate } from "./__generated__/LocationCreate";
import { GET_ALL_LOCATIONS, CREATE_NEW_LOCATION, GET_LOCATION, DELETE_LOCATION, UPDATE_LOCATION } from "./queries";
import { LocationWriteInput } from "../../../../__generated__/globalTypes";
import { LocationRead } from "./__generated__/LocationRead";
import { LocationRemove } from "./__generated__/LocationRemove";
import { LocationUpdate } from "./__generated__/LocationUpdate";

class LocationAPIService {

    tenant:string | undefined = process.env.REACT_APP_LOCATION_API_TENANT;

    async getAllLocations() : Promise<LocationList["locationList"]> {
        try {
            let limit = 100;
            let orderBy = "updated"
            let order = "desc"
            let tenant = this.tenant
            const response = await apolloClient.query({ query: GET_ALL_LOCATIONS, variables: { tenant, limit, orderBy, order }})
            if(!response || !response.data)
                throw new Error("Cannot get location list")

            return response.data.locationList.resources
        } catch(err) {
            throw err;
        }
    }

    async addNewLocation(requestBody: LocationWriteInput ) : Promise<LocationCreate["locationCreate"]> {

        let limit = 100;
        let orderBy = "updated"
        let order = "desc"
        let tenant = this.tenant

        try{
            const response = await apolloClient.mutate({variables:{tenant,requestBody},mutation:CREATE_NEW_LOCATION,refetchQueries:[{query:GET_ALL_LOCATIONS, variables: { tenant, limit, orderBy, order }}]})
            if(!response || !response.data)
                    throw new Error("Cannot create a new location")

            return response.data.locationCreate
        }catch(err){
            throw err;
        }

    }

    async getLocationOnId(locationId: String ) : Promise<LocationRead["locationRead"]> {
        let locationReadId = locationId
        let tenant = this.tenant

        try {

            const response = await apolloClient.query({ query: GET_LOCATION, variables: { locationReadId, tenant }})
            console.log("direct call",response)
            if(!response || !response.data)
                throw new Error("Cannot get location list")

            return response.data.locationRead.resource
        } catch(err) {
            throw err;
        }
    }

    async deleteLocation(locationRemoveId: string ) : Promise<LocationRemove["locationRemove"]> {

        let limit = 100;
        let orderBy = "updated"
        let order = "desc"
        let tenant = this.tenant

        try{
            const response = await apolloClient.mutate({variables:{locationRemoveId, tenant},mutation:DELETE_LOCATION,refetchQueries:[{query:GET_ALL_LOCATIONS, variables: { tenant, limit, orderBy, order }}]})
            if(!response || !response.data)
                    throw new Error("Cannot delete the location")

            return response.data
        }catch(err){
            throw err;
        }

    }

    async updateLocation(locationUpdateId: string, requestBody: LocationWriteInput ) : Promise<LocationUpdate["locationUpdate"]> {

        let limit = 100;
        let orderBy = "updated"
        let order = "desc"
        let tenant = this.tenant

        try{
            const response = await apolloClient.mutate({variables:{locationUpdateId, tenant, requestBody},mutation:UPDATE_LOCATION,refetchQueries:[{query:GET_ALL_LOCATIONS, variables: { tenant, limit, orderBy, order }}]})
            if(!response || !response.data)
                    throw new Error("Cannot update the location")

            return response.data
        }catch(err){
            throw err;
        }

    }

}

export default new LocationAPIService();