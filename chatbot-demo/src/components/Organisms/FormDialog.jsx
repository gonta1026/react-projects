import React, {useState, useEffect, useCallback} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextInput, FormButton } from "..";
// import { FormButton } from "";
import WEBHOOK_URL from '../../webhookConfig'

// const line = require('@line/bot-sdk');//todo いずれラインへの通知実装のために使いたい。

const FormDialog = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const submitForm = async () =>　{
    try {
      const payload = {
        text: 'お問い合わせがありました\n' +
          'お名前: ' + name + '\n' +
          'メールアドレス: ' + email + '\n' +
          '【問い合わせ内容】\n' + description
      };

      await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
      })

      alert('送信が完了しました。追ってご連絡いたします🙌');
      setName("");
      setEmail("");
      setDescription("");
    } catch {
      alert("送信が完了しました。追ってご連絡いたします🙌");
    }

    return props.handleClose();
  }

  return(  
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <TextInput
            label={"お名前（必須）"} multiline={false} rows={1}
            value={name} type={"text"} onChange={event => setName(event.target.value)}
          />
          <TextInput
            label={"email（必須）"} multiline={false} rows={1}
            value={email} type={"email"} onChange={event => setEmail(event.target.value)}
          />
          <TextInput
            label={"お問い合わせ内容"} multiline={true} rows={5}
            value={description} type={"text"} onChange={event => setDescription(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <FormButton submitEvent={props.handleClose} text={"キャンセル"}/>
          <FormButton submitEvent={submitForm} text={"送信"}/>
        </DialogActions>
      </Dialog>
  )
}

export default FormDialog;
