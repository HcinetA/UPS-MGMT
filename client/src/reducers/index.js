import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import pauth from './pauth';
import profile from './profile';

export default combineReducers({
  alert,
  auth,
  pauth,
});
