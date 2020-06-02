import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import LoginProf from '../auth/LoginProf';
import RegisterProf from '../auth/RegisterProf';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from '../routing/PrivateRoute';
import Pdashboard from '../pdashboard/Pdashboard';
import CreateProfProfile from '../prof-profile-forms/CreateProfProfile';
import EditProfProfile from '../prof-profile-forms/EditProfProfile';
import PrivateRouteP from '../routing/PrivateRouteP';
import CreateProfile from '../profile-forms/CreateProfile';
import Profiles from '../profiles/Profiles';
import Profile from '../Profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import UProfiles from '../uprofiles/UProfiles';
import UProfile from '../uprofile/Uprofile';
import UPosts from '../Uposts/UPosts';
import UpostsClasse from '../Uposts/UpostsClasse';
import EditProfile from '../profile-forms/EditProfile';
import Upost from '../upost/Upost';
import Notfound from '../layout/Notfound';
export const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/registerprof' component={RegisterProf} />
        <Route exact path='/loginprof' component={LoginProf} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <Route exact path='/uprofiles' component={UProfiles} />
        <Route exact path='/uprofile/:id' component={UProfile} />

        <PrivateRouteP exact path='/pdashboard' component={Pdashboard} />
        <PrivateRouteP exact path='/posts' component={Posts} />
        <PrivateRouteP exact path='/posts/:id' component={Post} />
        <PrivateRoute exact path='/uposts' component={UPosts} />
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
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/uposts/:id' component={Upost} />
        <Route exact path='/uposts/c/:classe' component={UpostsClasse} />
        <Route component={Notfound} />
      </Switch>
    </section>
  );
};

export default Routes;
