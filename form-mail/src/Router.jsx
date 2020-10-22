import React from "react";
// import { BrowserRouter, Route, Switch } from "react-router";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './App';
import Search from './Search';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={App} />
        <Route exact path={"/search"} component={Search} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
