import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getIsSignedIn} from "./reducks/users/selectors";
import {listenAuthState} from "./reducks/users/operations";
import {useLocation} from "react-router";

const Auth = ({children}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  const isSignedIn = getIsSignedIn(selector);
  // const isSignedIn = getUser(selector).isSignedIn;
  console.log(isSignedIn)
  useEffect(() => {
    if (!isSignedIn){
      console.log("falseだよー")
      dispatch(listenAuthState(location.pathname))
    }
  }, []);

  if (!isSignedIn){
    return <></>
  } else {
    return children  
  }
}

export default Auth;
