import React from "react";
// import {useDispatch} from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import {getUser} from "../reducks/users/selectors";
const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const user = getUser(selector);
  return (
    <div>
      <h2>Homeページ</h2>
      <button onClick={() => dispatch(push("/signIn"))}>
        ログインページへ
      </button>
      <p>{user.uId}</p>
      <p>{user.username}</p>
    </div>
  );
}

export default Home;