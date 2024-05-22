import React, { useState } from "react";

import Header from './components/Header/Header.tsx';
import MainScreen from './components/MainScreen/MainScreen.tsx';
import Graph2D from './components/Graph2D/Graph2D.tsx';
import Graph3D from './components/Graph3D/Graph3D.tsx';
import UniCalculator from './components/UniCalculator/UniCalculator.tsx';
import RPG from './components/RPG/RPG';
import AboutMe from './components/AboutMe/AboutMe.tsx';

import './App.css';

export enum EPAGES {
  MAINSCREEN = 'MainScreen',
  GRAPH_2D = 'Graph2D',
  GRAPH_3D = 'Graph3D',
  UNICALCULATOR = 'UniCalculator',
  RPG = 'RPG',
  ABOUTME = 'AboutMe'

}

const App: React.FC = () => {
  const [pageName, setPageName] = useState<EPAGES>(EPAGES.MAINSCREEN);

  return (<div className='app'>
    <Header setPageName={
      setPageName
    } />

    {pageName === EPAGES.MAINSCREEN && <MainScreen/>}
    {pageName === EPAGES.GRAPH_2D && <Graph2D/>}
    {pageName === EPAGES.GRAPH_3D && <Graph3D/>}
    {pageName === EPAGES.UNICALCULATOR && <UniCalculator/>}
    {pageName === EPAGES.RPG && <RPG/>}
    {pageName === EPAGES.ABOUTME && <AboutMe/>}

  </div>)
}

export default App;