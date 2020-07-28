import React, {useState, useCallback} from "react";
import TextInput from "../components/UIkit/TextInput"

const SignUp = () => {
  
  const [username, setUsername] = useState(""),
  [email, setEmail] = useState(""),
  [password, setPassword] = useState(""),
  [confirmPassword, setConfirmPassword] = useState("");
          
      const inputUsername = useCallback((e) => {
        setUsername(e.target.value)
      }, [setUsername]);

  return (
    <div className={"c-section-container"}>
      <h2 className={"u-text__headline u-text-center"}>アカウント登録</h2>
      <div className={"module-spacer--medium"} />
      <TextInput
        fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
        rows={1} type={"text"} onChange={inputUsername} value={username}
      />
    </div>
  )
} 

export default SignUp;