import React from "react";
const Panel = ({ children, first, second, third }) => {
    return (
        <div className="panel">
            <span>🏆:{first }  | |  🥈:{second } | | 🥉:{third}</span>
            {children}
        </div>
    );
};
export default Panel;