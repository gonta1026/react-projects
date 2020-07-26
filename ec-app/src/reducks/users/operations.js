import {signInAction} from "./actions"
import {push} from "connected-react-router";

export const signIn = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;
    if (!isSignedIn){
      const url = "https://api.github.com/users/deatiger";

      const res = await fetch(url)
      .then(res => res.json())
      .catch(() => null);

      const userName = res.login;

      dispatch(signInAction({
        isSignedIn: true,
        uId: "0202",
        userName: userName
      }))
      dispatch(push("/"))
    }
  }
}