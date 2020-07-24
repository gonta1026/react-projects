import React from "react";
import Button from '@material-ui/core/Button';

const FormButton = (props) => {
  return (  
    <Button onClick={props.submitEvent} color="primary">{props.text}</Button>
  )
}

export default FormButton