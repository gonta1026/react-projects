import React from "react";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";
import { signInAction } from "../reducks/users/actions";
import {signIn} from "../reducks/users/operations"

const Login = () => {
  const dispatch = useDispatch(signIn);
  return(
    <div>
      <h2>ログイン</h2>
      <button onClick={() => dispatch(signIn())}>
        ログインする1
      </button>

      <button onClick={
        () => {
          dispatch(signInAction({uId: 2222, userName: "keisei"}));
          dispatch(push("/"));
        }
      }>
        ログインする2
      </button>
    </div>
  );
}

export default Login;