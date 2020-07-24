import React, {useState, useEffect, useCallback} from 'react';
import './assets/styles/style.css';
import {AnswersList, Chats, FormDialog} from "./components";
import {db} from "./firebase/index";

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
      addChats({
        text: nextDataset.question,
        type: "question"
      });
      setAnswers(nextDataset.answers);
      setCurrentId(nextQuestionId);
  }

  const selectAnswer = (selectedAnser, nextQuestionId) => {
    switch(true){

      case (nextQuestionId === "contact"):
        handleClickOpen()
        break;
      case (/^https:*/.test(nextQuestionId)):
        const aTag = document.createElement("a");
        aTag.href = nextQuestionId;
        aTag.target = "_blank";
        aTag.click();
        break;

      default:
        addChats({
          text: selectedAnser,
          type: "answer"
        });

        setTimeout(() => {
          displayNextQuestion(nextQuestionId, dataset[nextQuestionId]);
        }, 500);
    }
  }

  const addChats = (chat) => {
    setChats(prevChats => {
      return [...prevChats, chat];
    })
  }

  const handleClickOpen = () => {
    setOpen(true)
  };
    const handleClose = useCallback(() => {
      setOpen(false)
    }, [setOpen]);

  //ある特定の関数の中でasyncを扱う時のテクニック。無名関数をasyncで使って即時関数で実行させる。
  useEffect(()=> {
    (async ()=>{ 
      const initDataset = {}
      // const dataset = this.state.dataset
      await db.collection("questions").get().then(snapshots => {
        snapshots.forEach(doc => {
          const id = doc.id
          const data = doc.data()
          initDataset[id] = data
        })
      });

      setDataset(initDataset);
      displayNextQuestion(currentId, initDataset[currentId])
    })();
  }, []);

  useEffect(()=> {
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });

  return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={chats}/>
          <AnswersList answers={answers} selected={selectAnswer}/>
          <FormDialog open={open} handleClose={handleClose}/>
        </div>
      </section>
  );
}

export default App;