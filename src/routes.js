import React, {Fragment, useRef} from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import postsData from './data/postsData';

const Routes = ({ allCanvasNames, canvas }) => {
  const canvasRef = useRef();
  const location = useLocation();
  const MainCanvas = canvas['Main'];

  const name = location.pathname === "/" ? 'Main' : location.pathname.slice(1);
  const Credits = postsData[name]?.credits

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
            <Route key={name} path={`/${name.slice(1)}`} exact>
              <Canvas ref={canvasRef} />
            </Route>
          );
        })}
      </Switch>
    </Fragment>
  );
};

export default Routes;






