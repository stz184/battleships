import React from "react";
import ReactDOM from "react-dom";
import "./Battleships.css";
import Game from "./Game";

const Battleships = () => {
    return (
        <div className="App">
            <Game rows={10} columns={10} />
        </div>
    );
};

export default Battleships;

if (document.getElementById('root')) {
    ReactDOM.render(<Battleships />, document.getElementById('root'));
}
