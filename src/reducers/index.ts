import { combineReducers } from "@reduxjs/toolkit";
import locations from "./locationReducer"

export default combineReducers({
    locations: locations
})