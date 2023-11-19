import React, { useState, useEffect } from "react";
import Buttons from "./button";
const Player = ({
    id,
    name,
    turn,
    nextPlayer,
    setPlayers,
    myPayers,
    setFirst,
    setSecond,
    setThird,
}) => {
    let rand = Math.floor(Math.random() * 99);
    const [numbers, setNumbers] = useState(rand);
    const [steps, setSteps] = useState(0);
    const [stop, setStop] = useState(false);
    const [allPlayers, setAllPlayers] = useState(myPayers);

    useEffect(() => {
        if (numbers == 100) {
            setAllPlayers([
                ...allPlayers,
                (allPlayers[id].winner = allPlayers[id].winner + 1),
            ]);
            setAllPlayers([...allPlayers, (allPlayers[id].step =allPlayers[id].step+ steps)]);

            setAllPlayers([...allPlayers, (allPlayers[id].average =allPlayers[id].step/allPlayers[id].winner)]);
            console.log(allPlayers);

            const filteredArray = filterByField(allPlayers);
            setFirst(filteredArray[0].name);
            if (filteredArray.length >= 3) {
                setSecond(filteredArray[1].name);
                setThird(filteredArray[2].name);
            } else if (filteredArray.length >= 2) {
                setSecond(filteredArray[1].name);
            }

            console.log(filteredArray);
        }
    }, [numbers]);

    useEffect(() => {
        setAllPlayers([...allPlayers, (allPlayers[id].step = steps)]);
    }, [stop]);

    const design = {
        transform: "scale(1.1)",
        transition: "transform 0.5s ease-in-out",
        // display: stop ? 'none' : `block`,
        boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.9)", // כאן מוסיפים את הצלליה
    };
    const OnButtons = (event) => {
        console.log("stop:" + stop);
        setNumbers(Math.floor(eval(numbers + event.target.innerText)));
        setSteps(steps + 1);
        if (
            numbers + 1 == 100 ||
            numbers - 1 == 100 ||
            numbers * 2 == 100 ||
            numbers / 2 == 100 ||
            numbers === 100
        ) {
            let arr = new Array(6).fill(false);
            setPlayers([...arr]);
        } else {
            nextPlayer();
        }
    };

    const continueGame = () => {
        setNumbers(Math.floor(Math.random() * 99));
        setSteps(0);
        nextPlayer();
    };
    const OnButtonToStop = () => {
        let arr = new Array(7).fill(false);
        console.log("knv knv???");
        arr[id] = true;
        console.log(arr);
        setStop(true);
        console.log("stop:" + stop);
        setPlayers([...arr]);
        nextPlayer();
    };
    const option = (
        <div>
            <button onClick={continueGame}> start a new game</button>{" "}
            <button onClick={OnButtonToStop}>I want to stop</button>;
        </div>
    );
    return (
        <>
            {!stop && (
                <div id="player" style={turn ? design : {}}>
                    <h1>hi {name}</h1>
                    {numbers === 100 && <h1>{name} wins!</h1>}
                    <p>Your guess number is: {numbers}</p>
                    <p>Your number of steps: {steps}</p>
                    <Buttons OnButtons={OnButtons} turn={turn} />
                    {numbers === 100 && option}
                </div>
            )}
            {turn && stop && nextPlayer()}
        </>
    );
};
export default Player;

const filterByField = (data) => {
    // סינון השחקנים עם לפחות ניצחונות אחד
    const filteredPlayers = data.filter((player) => player.winner > 0);

    // מיון השחקנים לפי שדה הצעדים
    const sortedPlayers = filteredPlayers.sort((a, b) => a.average - b.average);

    return sortedPlayers;
};
