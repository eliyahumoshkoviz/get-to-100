import React, { useState } from "react";
let myName="";
const FullName = (props) => {
    const setName = (event) => {
        myName = event.target.value;
    };
    const upDateName = () => {
        props.name(myName);
        props.newPlayer(myName)
    }
    return (
        <div id="fullName">
            <input type="text" placeholder={"name player " + props.id} onChange={setName} />
            <button onClick={() => upDateName()}>upDate name</button>
        </div>
    )
}
export default FullName;






