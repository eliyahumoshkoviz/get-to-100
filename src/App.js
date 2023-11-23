import React, { useState, useEffect } from "react";
import "./App.css";
import EnterPlayer from "./component/enterPlayer";
import Player from "./component/player";
import Panel from "./component/panel";
import Patern from "./component/patern";
import HowManyPlayers from "./component/howManyPlayers";
import Registration from "./component/registration";
function App() {
  const [value, setValue] = useState(0);
  const [isUsed, setIsUsed] = useState(false); // קוראים לסטייט נוסף לשמירת מצב הכפתור
  const [isUsed2, setIsUsed2] = useState(false); // קוראים לסטייט נוסף לשמירת מצב הכפתור
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(0);
  let [myPlayers, setMyPlayers] = useState([]);
  function addPlayer(name) {
    const player = {
      name: name,
      winner: 0,
      step: 0,
      average: 0,
    };
    setMyPlayers([...myPlayers, player]);
  };
  const changeInput = (event) => {
    setValue(event.target.value);
  };
  const buttonClick = () => {
    setIsUsed(true); // משנים את מצב הכפתור להיות מופעל
    setTurns();
  };
  let setTurns = () => {
    let arr = new Array(10).fill(false);
    arr[0] = true;
    setPlayers([...arr]);
  };
  const ButtonClick2 = () => {
    setIsUsed(false); // משנים את מצב הכפתור להיות מופעל
    setIsUsed2(true); // משנים את מצב הכפתור להיות מופעל
  };
  const nextPlayer = () => {
    setPlayers(prevPlayers => {
      const newPlayers = prevPlayers.map((player, index) =>
        index === currentPlayer ? false : index === (currentPlayer + 1) % value);
      setCurrentPlayer((currentPlayer + 1) % value);
      return newPlayers;
    });
  };

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("myPlayers"));
    if (storedPlayers) {
      setMyPlayers(storedPlayers);
    }
  }, []);

  // שומר את נתוני השחקנים ב־localStorage בעת שינוי ב־myPlayers
  useEffect(() => {
    localStorage.setItem("myPlayers", JSON.stringify(myPlayers));
  }, [myPlayers]);

  let handleSubmit = () => {
    ButtonClick2();
  }

  return (
    <div className="App">
      <Patern />
      <HowManyPlayers changeInput={changeInput} buttonClick={buttonClick} />

      {isUsed && (<Registration handleSubmit={handleSubmit} addPlayer={addPlayer} value={value}/>
      )}
      <Panel first={first} second={second} third={third} ></Panel>
      <div id="players">
        {isUsed2 &&
          Array.from({ length: value }, (element, index) =>
            <Player key={index} id={index} turn={players[index]}
              nextPlayer={nextPlayer} setPlayers={setPlayers} myPlayers={myPlayers}
              setFirst={setFirst} setSecond={setSecond} setThird={setThird} />)
        } <br />
      </div>
    </div>
  );
}
export default App;