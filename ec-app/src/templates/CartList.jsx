import React, { useCallback } from 'react';
import { List } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import { getProductsInCart } from "../reducks/users/selectors";
import { CartListItem } from '../components/Products';
import { PrimaryButton } from '../components/UIkit';
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/styles";
import { createStyles } from "@material-ui/core";

const CartList = () => {
    const classes = (makeStyles((theme) =>
        createStyles({
            "root": {
                width: "100%",
                maxWidth: 512,
                margin: "0 auto"
            }
        })
    ))();

    const selector = useSelector(state => state);
    const porductInCart = getProductsInCart(selector);
    const dispatch = useDispatch();
    const goToOrder = useCallback(() => {
        dispatch(push("/order/confirm"))
    }, []);

    const backToHome = useCallback(() => {
        dispatch(push("/"))
    }, []);
    return (
        <section className="c-section-wrapin">
            <h2 className="u-text__headline">ショッピングカート</h2>
            <List className={classes.root}>
                {porductInCart.length > 0 && (
                    porductInCart.map(product =>
                        <CartListItem key={product.cartId} product={product} />
                    )
                )}
            </List>
            <div className={"module-spacer--medium"}></div>
            <div className={"p-grid__column"}>
                {porductInCart.length > 0 ? (
                    <>
                        <PrimaryButton label={"レジへ進む"} onClick={goToOrder} variant="contained" color={"#60EEFF"} hoverColor={"#C2EEFF"} />
                        <div className={"module-spacer--medium"}></div>
                        <PrimaryButton label={"ショッピングを続ける"} onClick={backToHome} variant="contained" color={"#ddd"} hoverColor={"#4dde0e1"} />
                    </>
                ) : <>
                        <p>カートには何も入っていません！</p>
                    </>
                }
            </div>
        </section>
    )
}

export default CartList;