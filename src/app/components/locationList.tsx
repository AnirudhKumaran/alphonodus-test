import React from "react";
import { connect } from 'react-redux'
import * as locationAction from '../../actions/locationAction'
import { styled } from "styled-components";

import { useSelector,shallowEqual,useDispatch } from "react-redux";
import { setLocationId } from "../../actions/locationAction";
import { Dispatch } from "redux";

const LocationContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    height:250px;
`;

const LocationItemContainer = styled.div`
    width: 100%;
    height: 5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(237, 234, 222);
    margin: 0.5em;
`;

interface listProps {
    postLocationId: (locId: string) => void
}

const actionDispatch = (dispatch: Dispatch) => ({
    setLocationId: (locationId: string) => dispatch(setLocationId(locationId))
})

export function LocationListView(props:listProps) {

    const { setLocationId } = actionDispatch(useDispatch());

    function sendLocationId(id:string){
        setLocationId(id)
        props.postLocationId(id)
    }

    const locationList: any = useSelector(
        (state: LocationState) => state.locations,
        shallowEqual
    )

    if(!locationList)
        return (<div></div>)

    return <LocationContainer>
        {locationList && locationList.locations.map((location:any) => (
            <LocationItemContainer key={location.id} onClick={() => sendLocationId(location.id)} className="shadow bg-light rounded">
                <div className="row w-100">
                    <div className="col-8 text-left">{location.name || "Unknow User"} | {location?.alias || "No Alias"}</div>
                    <div className="col-4 text-right">
                        <span className="badge badge-pill badge-primary">{location?.status || "NA"}</span>
                    </div>
                </div>
                <div className="row w-100">
                    <div className="col-8 text-left">{ location?.address || "No Address Registered"}</div>
                </div>
                <div className="row w-100">
                    <div className="col-8 text-left">{ lasteUpdatedValue(location?.updatedAt) || "No Value Registered" }</div>
                    <div className="col-4 text-right">{ lastUpdateHours(location?.updatedAt) || "0" }h</div>
                </div>
            </LocationItemContainer>
        ))}
    </LocationContainer>

}

function lasteUpdatedValue(epochValue: number) {
    let dateValue = new Date(epochValue);
    let month = dateValue.toLocaleString('default', { month: 'short' });
    let dateNumber = dateValue.getDate()
    let updateHour = dateValue.getHours().toString().padStart(2, "0");
    let updatePeriod = dateValue.getHours() < 12 ? "AM" : "PM"
    let updatedMinute = dateValue.getMinutes().toString().padStart(2, "0");
    return (
        <div>
            <>&#128197;</> {month} - {dateNumber} <>&#128338;</> {updateHour} : {updatedMinute} {updatePeriod}
        </div>
    )
}

function lastUpdateHours(epochValue: number) {
    let dateValue = new Date(epochValue).getTime()
    let currentDate = new Date().getTime()
    let hours = Math.abs(currentDate - dateValue) / 36e5;
    return Math.ceil(hours)
}