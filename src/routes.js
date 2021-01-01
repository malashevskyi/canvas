import React, { useRef } from 'react';
import { Switch, Route } from 'react-router-dom';

const Routes = ({ allCanvasNames, canvas }) => {
  const canvasRef = useRef();
  
  return (
    <Switch>
      {allCanvasNames.map((name) => {
        let Canvas = canvas[name];

        return (
          <Route key={name} path={`/${name}`} exact>
            <Canvas ref={canvasRef} />
            <canvas ref={canvasRef}></canvas>
          </Route>
        );
      })}
    </Switch>
  );
};

export default Routes;






