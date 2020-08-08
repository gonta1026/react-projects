import React from "react";
import TextField from "@material-ui/core/TextField";

const TextInput = (props) => {
  return (
    <TextField
      margin={"dense"}
      fullWidth={props.fullWidth}
      label={props.label}
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      type={props.type}
      onChange={props.onChange}
      value={props.value}
      className={props.className}
    />
  )
}

export default TextInput;