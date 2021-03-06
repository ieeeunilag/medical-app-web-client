import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from './store';
import dataRoutes from './scenes/Data/routes';
import authRoutes from './scenes/Auth/routes';
import './Bootstrap.css';
import './App.css';
import AuthCheck from './components/AuthCheck';
import DashBoard from './components/DashBoard/index';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AuthCheck>
        <DashBoard roles="Student">
          <Switch>
            <Route exact path="/" component={() => (<h1>Home</h1>)} />
            {dataRoutes}
            {authRoutes}
          </Switch>
        </DashBoard>
      </AuthCheck>
    </BrowserRouter>
  </Provider>
);


// export default withRouter(connect(state => ({ user: state.user }))(App));
export default (App);
