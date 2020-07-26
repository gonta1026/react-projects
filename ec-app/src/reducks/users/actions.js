export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  return {
    type: "SIGN_IN",
    payload: {
      icon: userState.icon,
      isSigndIn: true,
      uId: userState.uId,
      username: userState.userName
    }
  }
}

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {
      isSigndIn: false,
      uId: "",
      username: ""
    }
  }
}

