import React from "react";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AvatarImage from '@material-ui/core/Avatar';

const Avator = (props) => {
  const isQuestion = (props.type === "question")
  const classes = isQuestion ? "p-chat__row" : "p-chat__reverse";

  return (  
    <AvatarImage alt="icon" src={props.image} /> 
  )
}

export default Avator