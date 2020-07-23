import React from 'react';
import defaultDataset from './dataset';
import './assets/styles/style.css';
import {AnswersList, Chats} from "./components";
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false
    };
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  displayNextQuestin = (nextQuestionId) => {
      const chats = this.state.chats;
      chats.push({
        text: this.state.dataset[nextQuestionId].question,
        type: "question"
      });
      this.setState({
        answers: this.state.dataset[nextQuestionId].answers,
        chats: chats,
        currentId: nextQuestionId,
      })
  }

  selectAnswer = (selectedAnser, nextQuestionId) => {
    switch(true){
      case (nextQuestionId === "init"):
        this.displayNextQuestin(nextQuestionId)
        break;
      default:
        const chats = this.state.chats;
        chats.push({
          text: selectedAnser,
          type: "answer"
        });

        this.setState({
          chats: chats
        })

        this.displayNextQuestin(nextQuestionId);
    }
  }

  componentDidMount(){
    const initAnswer = "";
    this.selectAnswer(initAnswer, this.state.currentId);
  }

  render(){
    return (
      <div>
        <section className="c-section">
          <div className="c-box">
            <Chats chats={this.state.chats}/>
            <AnswersList answers={this.state.answers} selected={this.selectAnswer}/>
          </div>
        </section>
      </div>
    );
  }
}

