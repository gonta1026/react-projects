import React from "react";
import TextField from "@material-ui/core/TextField";

const TextInput = ({ className, fullNmae, fullWidth, label, multiline, onChange, required, rows, type, value }) => {
  return (
    <TextField
      margin={"dense"}
      className={className}
      fullWidth={fullWidth}
      label={label}
      multiline={multiline}
      onChange={onChange}
      required={required}
      rows={rows}
      type={type}
      value={value}
    />
  )
}

export default TextInput;