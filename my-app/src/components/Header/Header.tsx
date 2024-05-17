import React from 'react';
import { EPAGES } from '../../App.tsx';

import './Header.css';

type THeader = {
    setPageName: (name: EPAGES) => void;
}

const Header: React.FC<THeader> = (props: THeader) => {
    const { setPageName } = props;

    return (<>
        <p className="beautyDiv">
            <h1> мой личный микрофреймворк! </h1>
        </p>
        <div className="beautyDiv">
            <button onClick={() => setPageName(EPAGES.MAINSCREEN)}>сёрф ми ту зе мейн скрин</button>
            <button onClick={() => setPageName(EPAGES.GRAPH_2D)}>покажы граф2д!</button>
            <button onClick={() => setPageName(EPAGES.GRAPH_3D)}>покажы граф3д!</button>
            <button onClick={() => setPageName(EPAGES.UNICALCULATOR)}>покажы калькулятор!</button>
            <button onClick={() => setPageName(EPAGES.RPG)}>покажы рпг!</button>
            <button onClick={() => setPageName(EPAGES.ABOUTME)}>обо мне!</button>
        </div>
    </>)
}

export default Header;