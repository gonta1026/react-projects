export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const fetchProductsAction = (products) => {
    console.log(products);
    return {
        type: "FETCH_PRODUCTS",
        payload: products
    }
}