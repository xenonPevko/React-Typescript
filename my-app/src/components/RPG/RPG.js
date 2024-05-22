import React, { useEffect } from "react";
import RPGGame from '../../modules/RPG/RPGGame';

import './RPG.scss';

const RPG = () => {

    const game = new RPGGame();

    useEffect(() => {
        game.goToRoom();
    });

    return (<div className="rpg_beautyDiv">
        <h1>бедный студент (мне его жалко)</h1>
        <div>
            <span id="roomTitle">title</span>
        </div>
        <p>  </p>
        <div>
            <span id="roomDescription">descr</span>
        </div>
        <p>  </p>
        <div>
            <span id="studentLife">123</span>
        </div>
        <p> </p>
        <div>
            <img id="roomImage" className="rpg_usualImg" alt=""></img>
        </div>
        <div id="actions"></div>
    </div>)
}

export default RPG;