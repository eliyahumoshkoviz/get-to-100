import React, { useState, useEffect } from "react";
import Buttons from "./button";
const Player = ({
    id,
    turn,
    nextPlayer,
    setPlayers,
    myPlayers,
    setFirst,
    setSecond,
    setThird,
}) => {
    let rand = Math.floor(Math.random() * 99);
    const [numbers, setNumbers] = useState(rand);
    const [steps, setSteps] = useState(0);
    const [stop, setStop] = useState(false);
    const [allPlayers, setAllPlayers] = useState(myPlayers);
    useEffect(() => {
        if (numbers == 100) {
            setAllPlayers([
                ...allPlayers,
                (allPlayers[id].winner = allPlayers[id].winner + 1),
            ]);
            setAllPlayers([...allPlayers, (allPlayers[id].step = allPlayers[id].step + steps)]);
            setAllPlayers([...allPlayers, (allPlayers[id].average = allPlayers[id].step / allPlayers[id].winner)]);
            const filteredArray = filterByField(allPlayers);
            const ad = filteredArray[0].name + " num of avarage is " + filteredArray[0].average;
            setFirst(ad);
            if (filteredArray.length >= 3) {
                const ad1 = filteredArray[1].name + " num of avarage is " + filteredArray[1].average;
                setSecond(ad1);
                const ad2 = filteredArray[2].name + " num of avarage is " + filteredArray[2].average;
                setThird(ad2);
            } else if (filteredArray.length >= 2) {
                const ad1 = filteredArray[1].name + " num of avarage is " + filteredArray[1].average;
                setSecond(ad1);
            }
            console.log(filteredArray);
        }
    }, [numbers]);

    useEffect(() => {
        // עדכון הנתונים ב-LocalStorage כאשר numbers הוא 100
        if (numbers === 100) {
            // עבור כל איבר במערך myPlayers, שמירתו ב-LocalStorage על פי מפתח ייחודי
            myPlayers.forEach((player, index) => {
                const uniqueKey = `player_${index}`; // מפתח ייחודי לכל שחקן
                localStorage.setItem(uniqueKey, JSON.stringify(player)); // שמירת נתוני השחקן במפתח ייחודי ב-LocalStorage
            });
        }
    }, [numbers, myPlayers]);
    useEffect(() => {
        setAllPlayers([...allPlayers, (allPlayers[id].step = steps)]);
    }, [stop]);
    const design = {
        transform: "scale(1.1)",
        transition: "transform 0.5s ease-in-out",
        boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.9)", // כאן מוסיפים את הצלליה
    };
    const OnButtons = (event) => {
        setNumbers(Math.floor(eval(numbers + event.target.innerText)));
        setSteps(steps + 1);
        if (
            numbers + 1 == 100 ||
            numbers - 1 == 100 ||
            numbers * 2 == 100 ||
            numbers / 2 == 100 ||
            numbers === 100
        ) {
            let arr = new Array(10).fill(false);
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
        let arr = new Array(10).fill(false);
        arr[id] = true;
        setStop(true);
        setPlayers([...arr]);
        nextPlayer();
    };
    const option = (
        <div>
            <button onClick={OnButtonToStop}>I want to stop</button>;
            <button onClick={continueGame}> start a new game</button>
        </div>
    );

    useEffect(() => {
        if (stop && turn) {
            nextPlayer();
        }
    }, [stop, turn, nextPlayer]);

    

    return (
        <>
            {!stop && (
                <div id="player" style={turn ? design : {}}>
                    <h1>hi {allPlayers[id].name}</h1>
                    {numbers === 100 && <h1>{allPlayers[id].name} wins!</h1>}
                    <p> number : {numbers}</p>
                    <p>steps: {steps}</p>
                    <Buttons OnButtons={OnButtons} turn={turn} />
                    {numbers === 100 && option}
                </div>
            )}
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