import React, { useEffect, useState } from "react";
import styled from "styled-components";

import LocationAPI from "../../services/locationService";
import { LocationList } from "../../services/locationService/__generated__/LocationList";

import { LocationListView } from "../../components/locationList";
import { DetailsForm } from "../../components/DetailsForm";
import { FiltersBar } from "../../components/FiltersBar";
import { HeaderBar } from "../../components/HeaderBar"

import { createLocation, setLocations,resetLocation } from "../../../actions/locationAction";
import { useSelector,shallowEqual,useDispatch } from "react-redux";
import { Dispatch } from "redux";

interface IHomePageProps {

}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: top;
`;

const ListPanel = styled.div`
    flex: 1;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #B9D9EB;
`;

const DetailPanel = styled.div`
    flex: 1;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #FFF44F;
`;

const actionDispatch = (dispatch: Dispatch) => ({
    setLocations: (locationList: ILocation[]) => dispatch(setLocations(locationList)),
    resetLocation: (payload: any) => dispatch(resetLocation(payload))
})

export function HomePage(props: IHomePageProps) {

    const { setLocations,resetLocation } = actionDispatch(useDispatch());

    const locationPageFetch = async () => {
        const locationPage = await LocationAPI.getAllLocations().catch((err) => {
            console.log("Error i am here: ", err)
        });

        if(locationPage) setLocations(Object.values(locationPage))
    }

    useEffect(() => {
        locationPageFetch();
    },[]);

    const [passSelectedId , setPassSelectedId] = useState("");

    const [formValues , setFormValues] = useState({
        locationName: 'Anirudh Kumaran',
        locationAlias: 'anilu',
        locationAddr: 'Karnata',
        locationDesc: 'blr',
        locationStat: false,
        locationId: '',
        locationUpdatedAt: 0
    })

    const receiveSelectedId = (lid:string) => {
        setPassSelectedId(lid)
    }

    const restartForm = () => {
        resetLocation({})
        setPassSelectedId("")
    }

    return <Container>
            
            <ListPanel>
                <HeaderBar resetForm={restartForm}/>               
                <FiltersBar />
                <LocationListView postLocationId={receiveSelectedId} />
            </ListPanel>
            <DetailPanel>
                <DetailsForm resetForm={restartForm} />
            </DetailPanel>
    </Container>
}