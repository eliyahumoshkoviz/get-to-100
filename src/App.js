import React, { useState, useEffect } from "react";
import "./App.css";
import FullName from "./component/FullName";
import Player from "./component/player";
import Panel from "./component/panel";
let indexName = 0;
let names = [];
function App() {
  const [value, setValue] = useState(0);
  const [isUsed, setIsUsed] = useState(false); // קוראים לסטייט נוסף לשמירת מצב הכפתור
  const [isUsed2, setIsUsed2] = useState(false); // קוראים לסטייט נוסף לשמירת מצב הכפתור
  const [isUsed3, setIsUsed3] = useState(false); // קוראים לסטייט נוסף לשמירת מצב הכפתור
  const [players, setPlayers] = useState([true, false, false, false]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(0);

  let [myPayers, setMyPlayers] = useState([]);
    function newPlayer(name) {
      const player = {
        name: name,
        winner: 0,
        step: 0,
        average: 0,
      };

      setMyPlayers([...myPayers , player]);
  }

  const changeInput = (event) => {
    setValue(event.target.value);
  };
  let x = false;
  const ButtonClick = () => {
    setIsUsed(true); // משנים את מצב הכפתור להיות מופעל
    setIsUsed2(true); // משנים את מצב הכפתור להיות מופעל
    setTurns();
  };
  let setTurns = () => {
    let arr = new Array(4).fill(false);
    arr[0] = true;
    setPlayers([...arr]);
  }
  const ButtonClick2 = () => {
    setIsUsed2(false); // משנים את מצב הכפתור להיות מופעל
    setIsUsed3(true); // משנים את מצב הכפתור להיות מופעל
  };
  let nameFunc = (name) => {
    names[indexName] = name;
    indexName++;
    console.log(name);
  }
  const nextPlayer = () => {
    setPlayers(prevPlayers => {
      const newPlayers = prevPlayers.map((player, index) =>
        index === currentPlayer ? false : index === (currentPlayer + 1) % value);
      setCurrentPlayer((currentPlayer + 1) % value);
      console.log("current player:" + newPlayers);
      return newPlayers;
    });
  };
  return (
    <div className="App">
      <div id="welcom">welcom to <br /><span></span> <span id="logo">Get-to-100</span>
        <div id="underLine"></div>
      </div>
      <div style={{ display: isUsed ? "none" : "block" }}>
        <input
          type="number"
          placeholder="How many players?"
          onChange={changeInput}
        />
        <button onClick={ButtonClick}>login</button>
      </div>

      <div id="fullName">{isUsed2 &&
        Array.from({ length: value }, (element, index) => <FullName
         key={index} id={index + 1} name={nameFunc} newPlayer={newPlayer}/>)
      }
        <br />
        {isUsed2 && <button onClick={ButtonClick2}>Get start</button>}
      </div>
      <div id="players">
        <Panel first={first} second={second} third={third} ></Panel>
        {isUsed3 &&
          Array.from({ length: value }, (element, index) =>
            <Player key={index} id={index} name={names[index]} turn={players[index]}
             nextPlayer={nextPlayer} setPlayers={setPlayers} myPayers={myPayers}
              setFirst={setFirst} setSecond={setSecond} setThird={setThird}/>)
        } <br />
      </div>
    </div>
  );
}
export default App;