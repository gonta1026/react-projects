import React from "react";
// import {useDispatch} from "react-redux";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Homeページ</h2>
      <button onClick={() => dispatch(push("/login"))}>
        ログインページへ
      </button>
    </div>
  );
}

export default Home;