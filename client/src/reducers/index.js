import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import pauth from './pauth';
import profprofile from './profprofile';
export default combineReducers({
  alert,
  auth,
  pauth,
  profprofile,
});
