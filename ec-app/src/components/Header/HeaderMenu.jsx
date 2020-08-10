import React, { useEffect } from 'react';
import IconButton from "@material-ui/core/IconButton";
import { Badge } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import { db } from '../../firebase'
import MenuIcon from "@material-ui/icons/Menu";

const HeaderMenu = (props) => {
    const dispatch = useDispatch();

    return (
        <>
            <IconButton>
                <Badge color="secondary">
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
                onClick={(event) => props.handleDrawerToggle(event)}
            >
                <MenuIcon />
            </IconButton>
        </>
    );
};
export default HeaderMenu;