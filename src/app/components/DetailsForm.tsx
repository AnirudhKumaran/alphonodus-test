import React, { useEffect, useState,useContext } from "react";
import { ReactReduxContext } from 'react-redux';
import { useStore } from "react-redux";
import LocationAPI from "../services/locationService";
import { LocationWriteInput } from "../../../__generated__/globalTypes";
import { useSelector,shallowEqual,useDispatch } from "react-redux";
import { connect } from "react-redux";

interface formProps{
    resetForm: (id:any) => void,
}

export function DetailsForm(props:formProps){

    var store  = useContext(ReactReduxContext).store.getState();
    var  selectedLocId = store.locations.selectedId

    const [formState, setFormState] = useState({
        locationName: '',
        locationAlias: '',
        locationAddr: '',
        locationDesc: '',
        locationStat: false,
        locationId: '',
        locationUpdatedAt: 0
    })

    const [alertBoxDisplay, setBoxDisplay]  = useState(false)
    const [alertMessage, setBoxMessage] = useState("Location Created!")

    const [updateButton, setUpdateDisabled]  = useState(false)
    const [createButton, setCreateDisabled]  = useState(false)
    const [deleteButton, setDeleteDisabled]  = useState(false)

    const getLocationDetails = async (idLoc:string) => {
        
        const particularLocation = await LocationAPI.getLocationOnId(idLoc).catch((err) => {
            console.log("Get Location Error", err)
        });

        let responseData:any = {}
        responseData = particularLocation

        if(responseData){
            setFormState({
                locationName: responseData?.name,
                locationAlias: responseData?.alias || '',
                locationAddr: responseData?.address || '',
                locationDesc: responseData?.description || '',
                locationStat: responseData?.status?.toLowerCase()==="active"?true:false,
                locationId: responseData?.id,
                locationUpdatedAt: responseData?.updatedAt || 0
            })
        }
    }

    useEffect(() => {

        if(selectedLocId!==""){
            getLocationDetails(selectedLocId)
        }else{
            setFormState({
                locationName: '',
                locationAlias: '',
                locationAddr: '',
                locationDesc: '',
                locationStat: false,
                locationId: '',
                locationUpdatedAt: 0
            })
        }
      }, [selectedLocId]);

    function submitForm(){
        setCreateDisabled(true)
        let body:LocationWriteInput = {
            "name": formState.locationName,
            "alias": formState.locationAlias,
            "address": formState.locationAddr,
            "description": formState.locationDesc,
            "status": formState.locationStat===true?"Active":"Inactive",
            "updatedAt": new Date().valueOf()
        }
        createLocationCall(body)
    }

    const createLocationCall = async (requestBody:LocationWriteInput) => {

        const createLocationResponse = await LocationAPI.addNewLocation(requestBody).catch((err) => {
            console.log("Create Error: ", err)
        }).then(()=>{
            setCreateDisabled(false)
            setBoxMessage("Created Successfully!")
            setBoxDisplay(true)
            setTimeout(function() {
                setBoxDisplay(false)
            }, 3000);
        })

        setFormState(
            {locationName: '',
            locationAlias: '',
            locationAddr: '',
            locationDesc: '',
            locationStat: false,
            locationId: '',
            locationUpdatedAt: 0}
        )        
    }

    const deleteButtonAction = () => {
        setDeleteDisabled(true)
        let deleteId = formState.locationId
        deleteLocationCall(deleteId)
    }

    const deleteLocationCall = async (resourceId:string) => {

        const deleteLocationResponse = await LocationAPI.deleteLocation(resourceId).catch((err) => {
            console.log("delete Error: ", err)
        }).then(()=>{    
            setDeleteDisabled(false)
            setBoxMessage("Deleted Successfully!")
            setBoxDisplay(true)
            setTimeout(function() {
                setBoxDisplay(false)
            }, 3000);
        })

        setFormState(
            {locationName: '',
            locationAlias: '',
            locationAddr: '',
            locationDesc: '',
            locationStat: false,
            locationId: '',
            locationUpdatedAt: 0}
        )

        selectedLocId = ""
        props.resetForm({})

    }

    const updateActionButton = () => {
        setUpdateDisabled(true)
        let actionId = formState.locationId
        let body:LocationWriteInput = {
            "name": formState.locationName,
            "alias": formState.locationAlias,
            "address": formState.locationAddr,
            "description": formState.locationDesc,
            "status": formState.locationStat===true?"Active":"Inactive",
            "updatedAt": new Date().valueOf()
        }
        updateLocationCall(actionId,body)
    }

    const updateLocationCall = async (resourceId:string, bodyJson: LocationWriteInput) => {
        const updateLocationResponse = await LocationAPI.updateLocation(resourceId,bodyJson).catch((err) => {
            console.log("update Error: ", err)
        }).then(() => {
            setUpdateDisabled(false)
            setBoxMessage("Updated Successfully!")
            setBoxDisplay(true)
            setTimeout(function() {
                setBoxDisplay(false)
            }, 3000);
        })
    }

    return(
        <form className="p-3">

                    <h1 className="display-4" id={ selectedLocId } >{ selectedLocId===""?"New Location Form":"Detail Screen"}</h1>

                    <div className="form-group mt-3">
                        <label htmlFor="locationName">Location Name</label>
                        <input 
                            type="text"
                            value={formState.locationName} 
                            onChange={(e) =>
                                setFormState({
                                  ...formState,
                                  locationName: e.target.value
                                })
                            }
                            className="form-control" 
                            id="locationName"
                            placeholder="Alex Pastor" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="locationAlias">Location Alias</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="locationAlias"
                            value={formState.locationAlias} 
                            onChange={(e) =>
                                setFormState({
                                  ...formState,
                                  locationAlias: e.target.value
                                })
                            } 
                            placeholder="Alex Office" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="locationDesc">Location Description</label>
                        <textarea 
                            className="form-control" 
                            id="locationDesc" 
                            value={formState.locationDesc} 
                            onChange={(e) =>
                                setFormState({
                                  ...formState,
                                  locationDesc: e.target.value
                                })
                            } 
                            rows={3}></textarea>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="locationAddr">Location Address</label>
                        <textarea 
                            className="form-control" 
                            id="locationAddr"
                            value={formState.locationAddr} 
                            onChange={(e) =>
                                setFormState({
                                  ...formState,
                                  locationAddr: e.target.value
                                })
                            } 
                            rows={3}></textarea>
                    </div>
                    
                    <div className="custom-control custom-switch">
                        <input 
                            type="checkbox" 
                            className="custom-control-input" 
                            checked={formState.locationStat} 
                            onChange={(e) =>
                                setFormState({
                                  ...formState,
                                  locationStat: e.target.checked
                                })
                            } 
                            id="locationStat" />
                        <label className="custom-control-label" htmlFor="locationStat">Location Active</label>
                    </div>

                    <div className="alert alert-primary my-2" role="alert" style={alertBoxDisplay?{display:"block"}:{display:"none"}}>
                        {alertMessage}
                    </div>

                    {
                        (selectedLocId==="")?
                        (<button type="button" onClick={submitForm} className="btn btn-success btn-lg btn-block my-3" disabled={createButton}>Create New Location</button>):
                        (<div className="d-flex flex-wrap mt-3">
                            <button  onClick={updateActionButton} type="button" className="mx-1 flex-fill btn btn-primary btn-lg" disabled={updateButton}>Update</button>
                            <button onClick={deleteButtonAction} type="button" className=" mx-1 flex-fill btn btn-danger btn-lg" disabled={deleteButton}>Delete</button>
                        </div>)
                    }

                </form>
    )

}