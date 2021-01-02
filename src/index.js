import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'

 // Will store all notification ids.
 window.notificationIds = [];

 // for not overlay the gui if fps is installed
setTimeout(() => {
  const fpsExtension = document.querySelector('.fps-extension')
  fpsExtension?.setAttribute('style', 'position: absolute; right: 340px; top: 0')
}, 1000)

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);