import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Routes = ({ allCanvasNames, canvas }) => {
  return (
    <Switch>
      {allCanvasNames.map((name) => {
        let Canvas = canvas[name];

        return (
          <Route key={name} path={`/${name}`} exact>
            <Canvas />
          </Route>
        );
      })}
    </Switch>
  );
};

export default Routes;






