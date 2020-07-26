import {createStore, combineReducers, applyMiddleware} from 'redux';
import {connectRouter, routerMiddleware} from "connected-react-router"
import {UsersReducer} from "../users/reducers"

export const store = (history) => {
    return createStore(
        combineReducers({
            users: UsersReducer,
            router: connectRouter(history)
        }),
        applyMiddleware(
          routerMiddleware(history)
        )
    );
}