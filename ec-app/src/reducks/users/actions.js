export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  console.log("actionsです")
  return {
    type: "SIGN_IN",
    payload: {
      role: userState.role,
      isSigndIn: true,
      uid: userState.uid,
      username: userState.username
    }
  }
}

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {
      isSigndIn: false,
      uid: "",
      username: ""
    }
  }
}

