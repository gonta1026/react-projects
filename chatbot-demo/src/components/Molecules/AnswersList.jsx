import React from 'react';
import {Answer} from "../index"

const AnswersList = (props) =>{
  // const [disabled, setDisabled] = useState(false)
  return(
    <div className="c-grid__answer">
      {props.answers.map((answer, index) => {
        return <Answer disabled={props.disabled} key={index.toString()} content={answer.content} selected={props.selected} nextId={answer.nextId}/>
      })}
    </div>
  )
}

export default AnswersList
