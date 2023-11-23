import React, { useState } from "react";
const HowManyPlayers = ({ changeInput, buttonClick }) => {
    const [isUsed, setIsUsed] = useState(false);
    const present = () => {
        setIsUsed(true);
        buttonClick();
    };
    return (
        !isUsed && <div>
            <input
                type="number"
                placeholder="How many players?"
                onChange={changeInput}
            />
            <button onClick={present}>login</button>
        </div>
    );
};

export default HowManyPlayers;


