import React, {useState, useCallback} from "react";
import TextInput from "../components/UIkit/TextInput"
import PrimaryButton from "../components/UIkit/PrimaryButton";
import {useDispatch} from "react-redux";
import {signUp} from "../reducks/users/operations"

const SignUp = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("ss"),
        [email, setEmail] = useState(""),
        [password, setPassword] = useState(""),
        [confirmPassword, setConfirmPassword] = useState("");

        const inputUsername = useCallback((e) => {
        setUsername(e.target.value)
      }, [setUsername]);
          
      const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
      }, [setEmail]);
          
      const inputPassword = useCallback((e) => {
        setPassword(e.target.value)
      }, [setPassword]);
          
      const inputConfirmPassword = useCallback((e) => {
        setConfirmPassword(e.target.value)
      }, [setConfirmPassword]);

  return (
    <div className={"c-section-container"}>
      <h2 className={"u-text__headline u-text-center"}>アカウント登録</h2>
      <div className={"module-spacer--medium"} />
      <TextInput
        fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
        rows={1} type={"text"} onChange={inputUsername} value={username}
      />
      
      <TextInput
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} type={"email"} onChange={inputEmail} value={email}
      />
      
      <TextInput
        fullWidth={true} label={"パスワード"} multiline={false} required={true}
        rows={1} type={"password"} onChange={inputPassword} value={password}
      />
      
      <TextInput
        fullWidth={true} label={"パスワード"} multiline={false} required={true}
        rows={1} type={"password"} onChange={inputConfirmPassword} value={confirmPassword}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton label={"submit"} onClick={() => dispatch(signUp(username, email, password, confirmPassword))}/>
      </div>
    </div>
  )
} 

export default SignUp;