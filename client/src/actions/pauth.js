import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTERPROF_SUCCESS,
  REGISTERPROF_FAIL,
  PROF_LOADED,
  PAUTH_ERROR,
  LOGINPROF_SUCCESS,
  LOGINPROF_FAIL,
  LOGOUTPROF,
} from './types';
import setPauthToken from '../utils/setPauthToken';
//Load Prof
export const loadProf = () => async (dispatch) => {
  if (localStorage.token) {
    setPauthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/pauth');
    dispatch({
      type: PROF_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PAUTH_ERROR,
    });
  }
};

// Register Prof
export const registerProf = ({ name, SN, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, SN, password });

  try {
    const res = await axios.post('/api/profs', body, config);
    dispatch({
      type: REGISTERPROF_SUCCESS,
      payload: res.data,
    });
    dispatch(loadProf());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTERPROF_FAIL,
    });
  }
};

// login Prof
export const loginProf = (SN, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ SN, password });

  try {
    const res = await axios.post('/api/pauth', body, config);
    dispatch({
      type: LOGINPROF_SUCCESS,
      payload: res.data,
    });
    dispatch(loadProf());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGINPROF_FAIL,
    });
  }
};

// log out prof /clear profile

export const logoutProf = () => (dispatch) => {
  dispatch({ type: LOGOUTPROF });
};
