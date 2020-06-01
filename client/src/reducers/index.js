import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import pauth from './pauth';
import profprofile from './profprofile';
import profile from './profile';
import post from './post';
import upost from './upost';

export default combineReducers({
  alert,
  auth,
  pauth,
  profprofile,
  profile,
  post,
  upost,
});
