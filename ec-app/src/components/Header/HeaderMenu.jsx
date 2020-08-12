import React, { useEffect } from 'react';
import IconButton from "@material-ui/core/IconButton";
import { Badge } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { getProductsInCart } from "../../reducks/users/selectors";
import MenuIcon from "@material-ui/icons/Menu";
import { getUserId } from "../../reducks/users/selectors";
import { fetchProductInCart } from "../../reducks/users/operations";
import { db } from "../../firebase";
const HeaderMenu = ({ handleDrawerToggle }) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    let productInCart = getProductsInCart(selector);

    useEffect(() => {
        const unsubscribe = db.collection("users").doc(uid).collection("cart")
            .onSnapshot(snapshots => {
                snapshots.docChanges().forEach(change => {
                    const product = change.doc.data();
                    const changeType = change.type;
                    switch (changeType) {
                        case "added":
                            console.log("added!!!");
                            productInCart.push(product);
                            break;
                        case "modified":
                            const index = productInCart.findIndex(product => product.id === change.doc.id);
                            productInCart[index] = product;
                            break;
                        case 'removed':
                            productInCart = productInCart.filter(product => product.cartId !== change.doc.id);
                            break;
                        default:
                            break;
                    }
                })
                dispatch(fetchProductInCart(productInCart))
            });
        return () => unsubscribe();
    }, [])
    return (
        <>
            <IconButton onClick={(() => dispatch(push("/cart")))}>
                <Badge color="secondary" badgeContent={productInCart.length}>
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <IconButton>
                <FavoriteBorderIcon />
            </IconButton>
            <IconButton
                aria-label="Menu Items"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={(event) => handleDrawerToggle(event)}
            >
                <MenuIcon />
            </IconButton>
        </>
    );
};
export default HeaderMenu;