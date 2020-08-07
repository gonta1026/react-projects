import * as Actions from './actions';
import { initialState } from '../store/initialState';

export const ProductsReducer = (state = initialState.products, action) => {
    console.log("reducers");
    console.log(state)
    console.log(action)
    switch (action.type) {
        case Actions.FETCH_PRODUCTS:
            return {
                ...state,
                list: [...action.payload]//!![]で囲まないとstoreの検知をしてくれない。
            };
        default:
            console.log("defaultだー")
            return state
    }
};

