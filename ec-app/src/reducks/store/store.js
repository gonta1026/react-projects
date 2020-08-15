import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from "connected-react-router"
import thunk from "redux-thunk";
import { UsersReducer } from "../users/reducers"
import { ProductsReducer } from "../products/reducers"
import { createLogger } from 'redux-logger';


export const store = (history) => {
    const middlewares = [routerMiddleware(history), thunk]
    if (process.env.NODE_ENV === "development") {
        const logger = createLogger({
            collapsed: true,
            diff: true
        });
        middlewares.push(logger)
        // [...middlewares, logger]
    }

    return createStore(
        combineReducers({
            users: UsersReducer,
            products: ProductsReducer,
            router: connectRouter(history)
        }),
        applyMiddleware(...middlewares)
    );
}