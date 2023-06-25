import React, { useEffect, useState } from "react";
import { Dispatch } from "redux";

import { filterByAddress } from "../../actions/locationAction";
import { useSelector,shallowEqual,useDispatch } from "react-redux";

const actionDispatch = (dispatch: Dispatch) => ({
    filterByAddress: (payload: any) => dispatch(filterByAddress(payload))
})

export function FiltersBar(){

    const { filterByAddress } = actionDispatch(useDispatch());

    const filterBarValue = (filterValue: String) => {
        let data = {"filterVal":filterValue}
        filterByAddress(data)
    }

    return (
        <div className="btn-group w-100 my-2" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-secondary mx-2" onClick={() => filterBarValue("active")}>Active</button>
            <button type="button" className="btn btn-secondary mx-2" onClick={() => filterBarValue("inactive")}>Inactive</button>
            <button type="button" className="btn btn-secondary mx-2" onClick={() => filterBarValue("address")}>No Address</button>
            <button type="button" className="btn btn-secondary mx-2" onClick={() => filterBarValue("alias")}>No Alias</button>
        </div>
    )

}