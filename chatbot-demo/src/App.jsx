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
  const [disabled, setDisabledAtAnswer] = useState(false);

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
      addChats({
        text: nextDataset.question,
        type: "question"
      });
      setAnswers(nextDataset.answers);
      setCurrentId(nextQuestionId);
  }

  const urlCheck = (url) => {
    return /^https:*/.test(url);
  }
  const selectAnswer = (selectedAnser, nextQuestionId) => {
    setDisabledAtAnswer(true);
    switch(true){
      case (nextQuestionId === "contact"):
        handleClickOpen()
        break;
      case (urlCheck(nextQuestionId)):
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
          setDisabledAtAnswer(false);
        }, 500);
    }
  }

  const addChats = (chat) => {
    setChats(prevChats => {//前回までのstateを取得してまーじさせる
      return [...prevChats, chat];
    })
  }

  const handleClickOpen = () => {
    setOpen(true)
  };
    const handleClose = useCallback(() => {
      setOpen(false)
      setDisabledAtAnswer(false);
    }, [open]);

  //ある特定の関数の中でasyncを扱う時のテクニック。無名関数をasyncで使って即時関数で実行させる。
  useEffect(()=> {  //初回だけのmountする。第二引数が空の配列
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

  useEffect(()=> {//毎回呼ばれるところ
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });

  return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={chats}/>
          <AnswersList disabled={disabled} answers={answers} selected={selectAnswer}/>
          <FormDialog open={open} handleClose={handleClose}/>
        </div>
      </section>
  );
}

export default App;