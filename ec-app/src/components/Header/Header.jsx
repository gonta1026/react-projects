import React, { useCallback, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useDispatch, useSelector } from "react-redux";
import { getIsSignedIn } from "../../reducks/users/selectors";
import logo from "../../assets/img/icons/logo.png";
import { HeaderMenu, ClosableDlawer } from "./index";
import { push } from "connected-react-router";

const Header = () => {

    const classes = (makeStyles(() =>
        createStyles({
            root: {
                flexGrow: 1,
            },
            menuBar: {
                backgroundColor: "#fff",
                color: '#444',
            },
            toolbar: {
                margin: '0 auto',
                maxWidth: 1024,
                width: '100%'
            },
            iconButtons: {
                margin: '0 0 0 auto'
            },
            width: {
                width: "128px"
            }
        }),
    ))()

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getIsSignedIn(selector);
    const [open, SetOpen] = useState(false);

    const handleDrawerToggle = useCallback((event) => {
        if (
            (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) ||
            (event.target && event.target.type === "text")/* 検索フォームでもdrawerが反応してしまうため */
        ) {
            return false;
        }
        SetOpen(!open);
    }, [SetOpen, open]);


    const [searchKeyword, setSearchKeyword] = useState("");
    const inputSearchKeyword = useCallback((event) => {
        setSearchKeyword(event.target.value)
    }, [searchKeyword])

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar className={classes.toolbar}>
                    <img alt="Logo" src={logo} className={classes.width} onClick={() => { dispatch(push('/')) }} role="button" />
                    {isSignedIn && (
                        <div className={classes.iconButtons}>
                            <HeaderMenu handleDrawerToggle={handleDrawerToggle} />
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <ClosableDlawer open={open} onClose={handleDrawerToggle} inputSearchKeyword={inputSearchKeyword} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
        </div>
    );
}

export default Header