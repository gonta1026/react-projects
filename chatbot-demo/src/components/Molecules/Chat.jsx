import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import NoProfile from "../../assets/img/no-profile.png"
import Torahack from "../../assets/img/torahack.png"
import {Avator, ListText} from "../index"

const Chat = (props) => {
  const isQuestion = (props.type === "question")
  const classes = isQuestion ? "p-chat__row" : "p-chat__reverse";
  const image = isQuestion ? Torahack : NoProfile;

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