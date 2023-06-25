import { createStore,applyMiddleware,Store } from 'redux';
import rootReducer from "../reducers"
import thunk from "redux-thunk";

const store: Store<LocationState,LocationAction> & {
    dispatch: DispatchType
} = createStore(rootReducer)

export default {store}