import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import GameLogic from './GameLogic';

const Main = () => (
  <div>
    {/* <Controls /> */}
    <main>
      <Switch>
        <Route exact path="/" component={GameLogic} />
        <Redirect to="/" />
      </Switch>
    </main>
  </div>
);

export default Main;
