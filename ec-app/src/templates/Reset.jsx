import React, {useState, useCallback} from "react";
import TextInput from "../components/UIkit/TextInput"
import PrimaryButton from "../components/UIkit/PrimaryButton";
import {useDispatch} from "react-redux";
import {resetPassword} from "../reducks/users/operations"
import { push } from "connected-react-router";

const Reset = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
      
      const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
      }, [setEmail]);
          
  return (
    <div className={"c-section-container"}>
      <h2 className={"u-text__headline u-text-center"}>リセットパスワード</h2>
      <div className={"module-spacer--medium"} />

      <TextInput
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} type={"email"} onChange={inputEmail} value={email}
      />
      
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton label={"password reset"} onClick={() => dispatch(resetPassword(email))}/>
        <p onClick={() => dispatch(push("/signin"))}>ログインページに戻る</p>
      </div>
    </div>
  )
} 

export default Reset;