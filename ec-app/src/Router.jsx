import React from 'react';
import {Route, Switch} from "react-router";
import {SignIn, Home, SignUp, Reset} from "./templates";
import Auth from "./Auth";

const Router = () =>  {
  return(
    <Switch>
      <Auth>
        <Route exact path={"/signup"} component={SignUp} />
        <Route exact path={"/signin"} component={SignIn} />
        <Route exact path={"/signin/reset"} component={Reset} />
        <Route exact path={"(/)?"} component={Home} />
      </Auth>
    </Switch>
  )
}

export default Router;