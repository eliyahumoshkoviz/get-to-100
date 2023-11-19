import React from "react";
const Panel = ({ children,first, second,third }) => {
    return (
        <div className="panel">
            <h1>First Place is {first}</h1>
            <h1>Second place is {second}</h1>
            <h1>Third place is {third}</h1>
            { children }
        </div>
    );
};
export default Panel;