
import React from "react";
let myName="";
const EnterPlayer = (props) => {
    const setName = (event) => {
        myName = event.target.value;
    };
    const upDateName = () => {
        props.addPlayer(myName)
    }
    return (
        <div id="fullName">
            <input type="text" placeholder={"name player " + props.id}
             onChange={setName} onBlur={upDateName} required/>
        </div>
    )
}
export default EnterPlayer;
