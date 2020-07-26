import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store} from "./reducks/store/store";
import App from './App';
import * as History from "history";
import * as serviceWorker from './serviceWorker';
import {ConnectedRouter} from "connected-react-router"
import './index.css';

const history = History.createBrowserHistory();//各ページでの繊維履歴を持っている。
export const getStore = store(history);
ReactDOM.render(
  <Provider store={getStore}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
