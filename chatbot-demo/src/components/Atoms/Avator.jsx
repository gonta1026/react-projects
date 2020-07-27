import React from "react";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AvatarImage from '@material-ui/core/Avatar';

const Avator = (props) => {
  return (  
    <AvatarImage alt="icon" src={props.image} /> 
  )
}

export default Avator