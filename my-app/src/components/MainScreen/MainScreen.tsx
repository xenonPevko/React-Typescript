import React from 'react';
import mainScreenImgSrc from 'C:/Users/YUSERVICE/Desktop/React+Typescript/my-app/src/assets/mainScreen.jpg';
import './MainScreen.scss'
const MainScreen: React.FC = () => {

    return (<div className="mainScreen_beautyDiv">
        <img src={mainScreenImgSrc} alt="главная страничька" ></img>
    </div>)

}

export default MainScreen;