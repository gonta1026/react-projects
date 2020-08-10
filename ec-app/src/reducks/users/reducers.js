import * as Actions from './actions';
import { initialState } from '../store/initialState';

export const UsersReducer = (state = initialState.users, action) => {
    console.log("reducers");
    console.log(state)
    console.log(action)
    switch (action.type) {
        case Actions.SIGN_IN:
            console.log("SIGN_INです！")
            return {
                ...state,
                ...action.payload
            };
        case Actions.SIGN_OUT:
            console.log("SIGN_OUTです！")
            return {
                ...state,
                ...action.payload
            };
        default:
            console.log("defaultだー")
            return state
    }
};

