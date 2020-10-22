import React, { useState, useEffect } from 'react';
import sakeData from "./data/sake"
import axios from 'axios';

const Search = (props) => {
  const [sake, setSake] = useState(sakeData);
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const url = "https://jsonplaceholder.typicode.com/posts";
      const users = await axios.get(url);
      setUsers(users.data);
      setFilterUsers(users.data);
    })();
  }, []);


  //NOTE 入力して文字がtitleとbodyに含まれていたら表示される。（スペース区切りの＆検索なし）
  const incrementSearch = (e) => {
    const text = e.target.value; /* keiseiと入力 */
    const reg = new RegExp(text); /* /keiseiと入力/となる */
    const filteredUsers = users.filter(user => {
      if (reg.test(user.title) | reg.test(user.body)) {
        return user;
      }
    });
    setFilterUsers(filteredUsers);
  }

  // //NOTE 入力して文字がtitleとbodyに含まれていたら表示される。（）
  const incrementSearch = (e) => {
    const text = e.target.value; /* keiseiと入力 */
    const words = text.split(/\s/g);
    // const reg = new RegExp(text); /* /keiseiと入力/となる */
    const filteredUsers = users.filter(user => {
      return words.every((word) => {
        const regWord = new RegExp(word);
        if (regWord.test(user.title) | regWord.test(user.body)) {
          return user;
        }
      });
    });
    setFilterUsers(filteredUsers);
  }



  return (
    <div>
      <input type="text" onChange={incrementSearch} />
      {filterUsers.map((user) =>
        <p key={user.id}>
          {user.title}
        </p>
      )}
    </div>
  )
}

export default Search;
/*
filterを使ったらいいんだろうが部分一致ってどうやるんやろう。
検索
いい記事があった。
この記事は参考になる。textで調べたらいいのか。。。
あ、できた気がするけど元配列が消えてしまう。これではだめだー。
じゃ表示用と検索時のfilter用でdata配列を別においとけばいいのかな？

*/

