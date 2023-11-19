import React from "react";
const Buttons = ({ OnButtons, turn }) => {
    return (
        <div>
            <button onClick={OnButtons} disabled={!turn}>+1</button>
            <button onClick={OnButtons} disabled={!turn}>-1</button>
            <button onClick={OnButtons} disabled={!turn}>*2</button>
            <button onClick={OnButtons} disabled={!turn}>/2</button>
        </div>
    );
};
export default Buttons;