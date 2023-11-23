import React from "react";
import EnterPlayer from "./enterPlayer";

let Registration = ({handleSubmit,addPlayer,value}) => {
    return (
        <form action="" onSubmit={handleSubmit}>
            <div id="fullName">
                {Array.from({ length: value }, (element, index) => (
                    <EnterPlayer key={index} id={index + 1} addPlayer={addPlayer} />
                ))}
                <br />
                <button type="submit">Get start</button>
            </div>
        </form>
    )
}
export default Registration;