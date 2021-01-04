import React, {Fragment, useRef} from 'react';
import { Switch, Route } from 'react-router-dom';

const Routes = ({ allCanvasNames, canvas }) => {
  const canvasRef = useRef();
  
  return (
    <Fragment>
      <canvas ref={canvasRef}></canvas>
      <Switch>
        {allCanvasNames.map((name) => {
          let Canvas = canvas[name];

          return (
            <Route key={name} path={`/${name}`} exact>
              {/* <Canvas /> */}
              <Canvas ref={canvasRef} />
            </Route>
          );
        })}
      </Switch>
    </Fragment>
  );
};

export default Routes;






