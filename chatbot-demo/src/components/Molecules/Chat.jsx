import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import NoProfile from "../../assets/img/no-profile.png"
import Torahack from "../../assets/img/torahack.png"
import {Avator, ListText} from "../index"

const Chat = (props) => {
  const isQuestion = (props.type === "question");
  let classes
  let image
  if (isQuestion){
    classes = "p-chat__row";
    image = Torahack;
  } else {
    classes = "p-chat__reverse";
    image = NoProfile;
  }

  return (  
    <ListItem className={classes}>
      <ListItemAvatar>
        <Avator image={image}/>
      </ListItemAvatar>
      <ListText text={props.text}/>
    </ListItem>
  )
}

export default Chat