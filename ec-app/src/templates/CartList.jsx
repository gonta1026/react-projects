import React from 'react';
import { List } from "@material-ui/core";
import { useSelector } from 'react-redux';
import { getProductsInCart } from "../reducks/users/selectors";
const CartList = () => {
    const selector = useSelector(state => state);
    const porductInCart = getProductsInCart(selector);
    return (
        <section className="c-section-wrapin">
            <h2 className="u-text__headline">
                ショッピングカート
            </h2>
            <List>
                {porductInCart.length > 0 && (
                    porductInCart.map(product => {

                    })
                )}
            </List>
        </section>
    )
}

export default CartList;