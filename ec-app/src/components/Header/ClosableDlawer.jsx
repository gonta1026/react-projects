import React, { useCallback, useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../reducks/users/operations";
import { TextInput } from "../UIkit";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { db } from "../../firebase";


const ClosableDrawer = ({ container, inputSearchKeyword, setSearchKeyword, onClose, open, searchKeyword }) => {

    const classes = (makeStyles((theme) =>
        createStyles({
            drawer: {
                [theme.breakpoints.up('sm')]: {
                    width: 256,
                    flexShrink: 0,
                }
            },
            // necessary for content to be below app bar
            toolbar: theme.mixins.toolbar,
            drawerPaper: {
                width: 256,
            },
            searchField: {
                alignItems: 'center',
                display: 'flex',
                marginLeft: 32
            }
        }),
    ))();

    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const selectMenu = (event, path) => {
        dispatch(push(path));
        setSearchKeyword("");
        onClose(event);
    };

    const drawerCloseAtSignOut = () => {
        setSearchKeyword("");
        onClose(false);
    }

    // const [searchKeyword, setSearchKeyword] = useState(""),
    const [filters, setFilters] = useState([
        { func: selectMenu, label: "すべて", id: "all", value: "/" },
        { func: selectMenu, label: "メンズ", id: "men", value: "/?gender=men" },
        { func: selectMenu, label: "レディース", id: "female", value: "/?gender=female" },
    ]);

    const menus = [
        { func: selectMenu, label: "商品登録", icon: <AddCircleIcon />, id: "register", value: "/product/edit" },
        { func: selectMenu, label: "注文履歴", icon: <HistoryIcon />, id: "history", value: "/order/history" },
        { func: selectMenu, label: "プロフィール", icon: <PersonIcon />, id: "profile", value: "/user/mypage" },
    ];

    useEffect(() => {
        db.collection('categories').orderBy("order", "asc").get()
            .then(snapshots => {
                const list = []
                snapshots.forEach(snapshot => {
                    const { name, id } = snapshot.data();
                    list.push({
                        func: selectMenu,
                        label: name,
                        id,
                        value: `/?category=${id}`
                    })
                });
                setFilters(prevState => [...prevState, ...list]);
            });
    }, [])

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant="temporary"
                anchor={"right"}
                open={open}
                onClose={(e) => onClose(e)}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <div
                    onClose={(e) => onClose(e)}
                    onKeyDown={(e) => onClose(e)}
                >
                    <div className={classes.searchField}>{/* 検索機能は余裕があれば実装する。*/}
                        <TextInput
                            fullWidth={false} label={"キーワードを入力"} multiline={false}
                            onChange={inputSearchKeyword} required={false} rows={1} value={searchKeyword} type={"text"}
                        />
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {menus.map((menu) => (
                            <ListItem key={menu.id} onClick={(e) => { menu.func(e, menu.value) }}>
                                <ListItemIcon>{menu.icon}</ListItemIcon>
                                <ListItemText>{menu.label}</ListItemText>
                            </ListItem>
                        ))

                        }
                        <ListItem button key="logout" onClick={() => {
                            dispatch(signOut());
                            drawerCloseAtSignOut();
                        }
                        }>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="ログアウト" />
                        </ListItem>
                    </List>
                    <Divider />

                    {filters.map((filter) => (
                        <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                            <ListItemText primary={filter.label} />
                        </ListItem>
                    ))}
                </div>
            </Drawer>
        </nav >
    );
}

export default ClosableDrawer