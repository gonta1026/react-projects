import React, {useState, useEffect, useCallback} from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import { TextInput } from "..";

const FormContent = (props) => {
  return(  
    <DialogContent>
      <TextInput
        label={"お名前（必須）"} multiline={false} rows={1}
        value={props.name} type={"text"} onChange={event => props.setName(event.target.value)}
      />
      <TextInput
        label={"email（必須）"} multiline={false} rows={1}
        value={props.email} type={"email"} onChange={event => props.setEmail(event.target.value)}
      />
      <TextInput
        label={"お問い合わせ内容"} multiline={true} rows={5}
        value={props.description} type={"text"} onChange={event => props.setDescription(event.target.value)}
      />
    </DialogContent>
  )
}

export default FormContent;
