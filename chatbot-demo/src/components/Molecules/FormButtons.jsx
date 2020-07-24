import React from "react";
import DialogActions from '@material-ui/core/DialogActions';
import { FormButton } from "../";

const FormButtons = (props) => {
  const isQuestion = (props.type === "question")
  const classes = isQuestion ? "p-chat__row" : "p-chat__reverse";

  return (  
    <DialogActions>
      <FormButton submitEvent={props.handleClose} text={"キャンセル"}/>
      <FormButton submitEvent={props.submitForm} text={"送信"}/>
    </DialogActions>
  )
}

export default FormButtons