import React, {useState, useEffect, useCallback} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { FormContent, FormTitle, FormButtons } from "..";
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
        <FormTitle />
        <FormContent
          name={name} email={email} description={description}
          setName={setName} setEmail={setEmail} setDescription={setDescription}
        />
        <FormButtons handleClose={props.handleClose} submitForm={submitForm}/>
      </Dialog>
  )
}

export default FormDialog;
