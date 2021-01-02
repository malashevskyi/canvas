import './styles/App.sass';
import React, { useCallback, useState } from 'react';
import ReactNotification from 'react-notifications-component'

import * as canvas from './canvas';
import Header from './components/header';
import Navbar from './components/navbar';
import Routes from './routes';
import MenuIsOpenProvider from './context/menuIsOpenContext';

function getCanvasNames() {
  return Object.keys(canvas);
}

function App() {
  const [filteredCanvasNames, setFilteredCanvasNames] = useState(getCanvasNames);
  const [allCanvasNames] = useState(getCanvasNames);

  const onEnteredFilterHandler = useCallback((filter) => {
    if (!filter.length) {
      setFilteredCanvasNames(Object.keys(canvas));
      return;
    }

    const newFilteredCanvas = [];
    Object.keys(canvas).forEach((name) => {
      if (name.toLowerCase().includes(filter)) {
        newFilteredCanvas.push(name);
      }
    });
    setFilteredCanvasNames(newFilteredCanvas);
  }, []);

  return (
    <div className="container">
      <ReactNotification />
      <MenuIsOpenProvider>
        <Header />
        <Navbar
          filteredCanvasNames={filteredCanvasNames}
          onEnteredFilter={onEnteredFilterHandler}
        />
      </MenuIsOpenProvider>
      <Routes canvas={canvas} allCanvasNames={allCanvasNames} />
    </div>
  );
}

export default App;
