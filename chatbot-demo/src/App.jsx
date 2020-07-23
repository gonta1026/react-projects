import React from 'react';
import defaultDataset from './dataset';
import './assets/styles/style.css';
import {AnswersList, Chats, FormDialog} from "./components";
// import FormDialog from './components/Forms/FromDialog';
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
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
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
        setTimeout(() => {
          this.displayNextQuestin(nextQuestionId)
        }, 500);
        break;
      case (nextQuestionId === "contact"):
        this.setState({
          open: true
        })
        break;
      case (/^https:*/.test(nextQuestionId)):
        const aTag = document.createElement("a");
        aTag.href = nextQuestionId;
        aTag.target = "_blank";
        aTag.click();
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

        setTimeout(() => {
          this.displayNextQuestin(nextQuestionId);
        }, 500);
    }
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    })
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  };

  componentDidMount(){
    const initAnswer = "";
    this.selectAnswer(initAnswer, this.state.currentId);
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }
  render(){
    return (
      <div>
        <section className="c-section">
          <div className="c-box">
            <Chats chats={this.state.chats}/>
            <AnswersList answers={this.state.answers} selected={this.selectAnswer}/>
            <FormDialog open={this.state.open} handleClose={this.handleClose}/>
          </div>
        </section>
      </div>
    );
  }
}

