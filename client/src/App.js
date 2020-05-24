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
import CreateProfProfile from './components/prof-profile-forms/CreateProfProfile';
import EditProfProfile from './components/prof-profile-forms/EditProfProfile';
import PrivateRouteP from './components/routing/PrivateRouteP';
import CreateProfile from './components/profile-forms/CreateProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/Profile/Profile';
import Posts from './components/posts/Posts';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import { loadProf } from './actions/pauth';

import './App.css';
import setAuthToken from './utils/setAuthToken';
import setPauthToken from './utils/setPauthToken';
import EditProfile from './components/profile-forms/EditProfile';

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
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />

              <PrivateRouteP exact path='/pdashboard' component={Pdashboard} />
              <PrivateRouteP exact path='/posts' component={Posts} />

              <PrivateRouteP
                exact
                path='/create-pprofile'
                component={CreateProfProfile}
              />
              <PrivateRouteP
                exact
                path='/edit-pprofile'
                component={EditProfProfile}
              />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
