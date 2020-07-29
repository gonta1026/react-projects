import {signInAction} from "./actions"
import {push} from "connected-react-router";
import {db, auth, firebaseTimeStapmp} from "../../firebase/index"

export const signIn = (email, password) => {
  console.log("operationsです")
  return async (dispatch) => {
    if ( email === "" || password === "") {
      alert("入力もれがあります！");
      return false;
    }

    auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user;

        if (user){
          const uid = user.uid;
          db.collection("users").doc(uid).get()
          .then(snapshot =>{
            const data = snapshot.data();
            dispatch(signInAction({
              role: data.role,
              isSigndIn: true,
              uid: uid,
              username: data.username
            }))
          })
          dispatch(push("/"));
        }
      });

    
  }
}


export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch, getState) => {
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
      alert("入力もれがあります！");
      return false;
    }
    
    if (password !== confirmPassword) {
      alert("パスワードが一致していません！");
      return false;
    }
    auth.createUserWithEmailAndPassword(email, password)
    .then((result)=>{
      const user = result.user;

      if (user){
        const uid = user.uid;
        const timeStamp = firebaseTimeStapmp.now();
        const initialUserData = {
          created_at: timeStamp,
          email: email,
          username: username,
          uid: uid,
          updated_at: timeStamp,
          role: "customer"
        }
        db.collection("users").doc(uid).set(initialUserData)
          .then(()=> {
            dispatch(push("/"));
          });
      }
    });
  }
}