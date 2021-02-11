import './styles/App.sass';
import React, { useCallback, useState } from 'react';
import ReactNotification from 'react-notifications-component'

import * as canvas from './canvas/_index';
import Header from './components/header';
import Navbar from './components/navbar';
import Routes from './routes';
import MenuIsOpenProvider from './context/menuIsOpenContext';
import postsData from './data/postsData';

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
      
      // delete postsData.Main;

      if (name !== 'Main') {
        const postsTags = postsData[name.slice(1)].tags;
  
        for (let i = 0; i <  postsTags.length; i++) {
          const tag = postsTags[i];
          if (tag.toLowerCase().includes(filter)) {
            newFilteredCanvas.push(name);
            continue;
          }
        }
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
