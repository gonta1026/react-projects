import * as Actions from './actions';
import {initialState} from '../store/initialState';

export const ProductsReducer = (state = initialState.products, action)  => {
    console.log("reducers");
    console.log(state)
    console.log(action)
    switch (action.type) {

        default:
            console.log("defaultだー")
            return state
    }
};

