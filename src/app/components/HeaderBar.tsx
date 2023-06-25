import React, { useEffect, useState } from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { LocationList } from "../services/locationService/__generated__/LocationList";
import LocationAPI from "../services/locationService";
import { createLocation, setLocations, resetLocation } from "../../actions/locationAction";

const actionDispatch = (dispatch: Dispatch) => ({
    setLocations: (locationList: ILocation[]) => dispatch(setLocations(locationList)),
    
})

interface HeaderProps{
    resetForm: (id:any) => void,
}

export function HeaderBar(props:HeaderProps){

    const { setLocations } = actionDispatch(useDispatch());

    const fetchAnimePage = async () => {
        const animePage = await LocationAPI.getAllLocations().catch((err) => {
            console.log("Error i am here: ", err)
        });

        console.log("Headerbar action: ",animePage)
        if(animePage) setLocations(Object.values(animePage))
    }

    return (
        <div className="row my-2">
            <div className="col-2 d-flex justify-content-center"> <button type="button" onClick={fetchAnimePage} className="btn btn-primary">&#10227;</button> </div>
            <div className="col-8 d-flex justify-content-center align-items-center"> <h3>Locations</h3> </div>
            <div className="col-2 d-flex justify-content-center"> <button type="button" onClick={() => props.resetForm({})} className="btn btn-success">&#43;</button> </div>
        </div>
    )

}
