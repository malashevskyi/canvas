import React, {Fragment, useRef} from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import * as credits from './credits.js'

const Routes = ({ allCanvasNames, canvas }) => {
  const canvasRef = useRef();
  const location = useLocation();
  const MainCanvas = canvas['Main'];
  const Credits = credits[location.pathname === '/' ? 'Main' : location.pathname.slice(1)];

  return (
    <Fragment>
      <canvas ref={canvasRef}></canvas>
      <div className="credits">
        <Credits />
      </div>
      <Switch>
        <Route path="/" exact>
          <MainCanvas ref={canvasRef} />
        </Route>
        {allCanvasNames.map((name) => {
          let Canvas = canvas[name];

          return (
            <Route key={name} path={`/${name}`} exact>
              <Canvas ref={canvasRef} />
            </Route>
          );
        })}
      </Switch>
    </Fragment>
  );
};

export default Routes;






