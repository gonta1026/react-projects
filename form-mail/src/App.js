import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { functions } from "./firebase/firebase"


const App = () => {

    const [name, setName] = useState("");
    const [array, setArray] = useState([""]);
    // const [pass, setPass] = useState("");
    const onSubmit = (e) => {
        e.preventDefault()
        let data = {}
        data.name = e.target.name.value
        data.email = e.target.email.value
        data.content = e.target.content.value
        let sendMail = functions.httpsCallable('sendMail');
        sendMail(data);
        setName("");
        // e.target.name.value = ""
        e.target.email.value = ""
        e.target.content.value = ""
        e.target.value = ""
    }


    const textFieldStyle = {
        display: "flex",
        width: "300px",
    }

    const contactForm = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
    }


    return (
        <React.Fragment>
            <div style={contactForm}>
                <h2>お問い合わせ</h2>
                <form onSubmit={onSubmit}>
                    <TextField name="name" label="お名前" type="text" required value={name} style={textFieldStyle} />
                    <TextField name="email" label="メールアドレス" type="mail" required style={textFieldStyle} />
                    <TextField
                        required
                        name="content"
                        label="お問い合わせ内容"
                        multiline
                        rows="8"
                        margin="normal"
                        variant="outlined"
                        style={textFieldStyle}
                    />
                    <Button variant="contained" color="primary" type="submit" style={textFieldStyle} >
                        送信
            </Button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default App;