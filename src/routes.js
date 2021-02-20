import React, {Fragment, useRef} from 'react';
import { Switch, Route } from 'react-router-dom';

const Routes = ({ allCanvasNames, canvas }) => {
  const canvasRef = useRef();
  const MainCanvas = canvas['Main'];

  return (
    <Fragment>
      <canvas ref={canvasRef}></canvas>
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






