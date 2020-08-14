import * as Actions from './actions';
import { initialState } from '../store/initialState';

export const UsersReducer = (state = initialState.users, action) => {
    switch (action.type) {
        case Actions.SIGN_IN:
            return {
                ...state,
                ...action.payload
            };
        case Actions.SIGN_OUT:
            return {
                ...state,
                ...action.payload
            };
        case Actions.FETCH_PRODUCT_IN_CART:
            return {
                ...state,
                cart: [...action.payload]
            };
        case Actions.FETCH_ORDERS_HISTORY_ACTION:
            return {
                ...state,
                order: [...action.payload]
            };
        default:
            return state
    }
};

