import {createStore, combineReducers, applyMiddleware} from 'redux';
import {connectRouter, routerMiddleware} from "connected-react-router"
import thunk from "redux-thunk";
import {UsersReducer} from "../users/reducers"
import {ProductsReducer} from "../products/reducers"

export const store = (history) => {
    return createStore(
        combineReducers({
            users: UsersReducer,
            products: ProductsReducer,
            router: connectRouter(history)
        }),
        applyMiddleware(
          routerMiddleware(history),
          thunk
        )
    );
}