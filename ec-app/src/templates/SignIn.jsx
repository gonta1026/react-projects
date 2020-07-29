import React, {useState, useCallback} from "react";
import TextInput from "../components/UIkit/TextInput"
import PrimaryButton from "../components/UIkit/PrimaryButton";
import {useDispatch} from "react-redux";
import {signIn} from "../reducks/users/operations"
import { push } from "connected-react-router";

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(""),
        [password, setPassword] = useState("");
      
      const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
      }, [setEmail]);
          
      const inputPassword = useCallback((e) => {
        setPassword(e.target.value)
      }, [setPassword]);
          
  return (
    <div className={"c-section-container"}>
      <h2 className={"u-text__headline u-text-center"}>サインイn</h2>
      <div className={"module-spacer--medium"} />

      <TextInput
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} type={"email"} onChange={inputEmail} value={email}
      />
      
      <TextInput
        fullWidth={true} label={"パスワード"} multiline={false} required={true}
        rows={1} type={"password"} onChange={inputPassword} value={password}
      />
      
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton label={"signin"} onClick={() => dispatch(signIn(email, password))}/>
        <p onClick={() => dispatch(push("/signup"))}>まだ新規登録をされていない方</p>
        <p onClick={() => dispatch(push("/signin/reset"))}>パスワードを忘れた方</p>
      </div>
    </div>
  )
} 

export default SignIn;