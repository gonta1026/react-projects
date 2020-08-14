export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
    return {
        type: "SIGN_IN",
        payload: {
            role: userState.role,
            isSigndIn: true,
            uid: userState.uid,
            username: userState.username
        }
    }
}

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
    return {
        type: "SIGN_OUT",
        payload: {
            isSigndIn: false,
            role: "",
            uid: "",
            username: ""
        }
    }
}

export const FETCH_PRODUCT_IN_CART = "FETCH_PRODUCT_IN_CART";
export const fetchProductInCartAction = (products) => {
    return {
        type: "FETCH_PRODUCT_IN_CART",
        payload: products
    }
}

export const FETCH_ORDERS_HISTORY_ACTION = "FETCH_ORDERS_HISTORY_ACTION";
export const fetchOrdersHistoryAction = (products) => {
    return {
        type: "FETCH_ORDERS_HISTORY_ACTION",
        payload: products
    }
}