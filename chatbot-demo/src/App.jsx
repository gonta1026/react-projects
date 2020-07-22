import React from 'react';
import defaultDataset from './dataset';
import "./assets/styles/index.css";
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      answers: [],
      chat: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false
    }
  }
  render(){
    return (
      <div>
        <section className="ddd">
          {this.state.currentId}
        </section>
      </div>
    );
  }
}

