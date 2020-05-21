import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import LoginProf from './components/auth/LoginProf';
import RegisterProf from './components/auth/RegisterProf';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Pdashboard from './components/pdashboard/Pdashboard';
import PrivateRouteP from './components/routing/PrivateRouteP';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import { loadProf } from './actions/pauth';

import './App.css';
import setAuthToken from './utils/setAuthToken';
import setPauthToken from './utils/setPauthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
if (localStorage.token) {
  setPauthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadProf());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/registerprof' component={RegisterProf} />
              <Route exact path='/loginprof' component={LoginProf} />
              <PrivateRouteP exact path='/pdashboard' component={Pdashboard} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
