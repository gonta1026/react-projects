import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { getUser } from "../reducks/users/selectors";
import { signOut } from "../reducks/users/operations"
const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const user = getUser(selector);
  console.log("homeページだよ")
  return (
    <div>
      <h2>Homeページ</h2>
      <button onClick={() => dispatch(push("/signIn"))}>
        ログインページへ
      </button>
      {user.uid}
      {user.username}
      <button onClick={() => dispatch(signOut())}>signOut</button>
    </div>
  );
}

export default Home;