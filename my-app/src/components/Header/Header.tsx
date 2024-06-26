import React from 'react';
import { EPAGES } from '../../App.tsx';

import './Header.scss';

type THeader = {
    setPageName: (name: EPAGES) => void;
}

const Header: React.FC<THeader> = (props: THeader) => {
    const { setPageName } = props;

    return (<>
        <p className="header_beautyP">
            <h1>ϟ мой личный микрофреймворк ϟ</h1>
        </p>
        <div className="header_beautyDiv">
            <button className="header_beautyButton" onClick={() => setPageName(EPAGES.MAINSCREEN)}>сёрф ми ту зе мейн скрин</button>
            <button className="header_beautyButton" onClick={() => setPageName(EPAGES.GRAPH_2D)}>покажы граф2д!</button>
            <button className="header_beautyButton" onClick={() => setPageName(EPAGES.GRAPH_3D)}>покажы граф3д!</button>
            <button className="header_beautyButton" onClick={() => setPageName(EPAGES.UNICALCULATOR)}>покажы калькулятор!</button>
            <button className="header_beautyButton" onClick={() => setPageName(EPAGES.RPG)}>покажы рпг!</button>
            <button className="header_beautyButton" onClick={() => setPageName(EPAGES.ABOUTME)}>обо мне!</button>
        </div>
    </>)
}

export default Header;