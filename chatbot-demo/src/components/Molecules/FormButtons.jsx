import React from "react";
import DialogActions from '@material-ui/core/DialogActions';
import { FormButton } from "../";

const FormButtons = (props) => {

  return (  
    <DialogActions>
      <FormButton submitEvent={props.handleClose} text={"キャンセル"}/>
      <FormButton submitEvent={props.submitForm} text={"送信"}/>
    </DialogActions>
  )
}

export default FormButtons