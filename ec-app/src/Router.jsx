import React from 'react';
import {Route, Switch} from "react-router";
import {SignIn, Home, SignUp, Reset, ProductEdit} from "./templates";
import Auth from "./Auth";

const Router = () =>  {
  return(
    <Switch>
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signup"} component={SignUp} />
      <Auth>
        <Route exact path={"/signin/reset"} component={Reset} />
        <Route exact path={"(/)?"} component={Home} />
        <Route exact path={"/products/edit"} component={ProductEdit} />
      </Auth>
    </Switch>
  )
}

export default Router;