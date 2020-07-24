import React from "react";
import DialogTitle from '@material-ui/core/DialogTitle';

const Avator = (props) => {
  const isQuestion = (props.type === "question")
  const classes = isQuestion ? "p-chat__row" : "p-chat__reverse";

  return (  
    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
  )
}

export default Avator