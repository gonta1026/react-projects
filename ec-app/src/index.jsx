import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./reducks/store/store";
import App from "./App";
import { createBrowserHistory } from "history";
import { unregister } from "./serviceWorker";
import { ConnectedRouter } from "connected-react-router";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./assets/theme";
const history = createBrowserHistory(); //各ページでの繊維履歴を持っている。
export const getStore = store(history);
ReactDOM.render(
    <Provider store={getStore}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);

unregister();
