import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFPROFILE,
  PROFPROFILE_ERROR,
  CLEAR_PROFPROFILE,
  PROFACCOUNT_DELETED,
  GET_PROFPROFILES,
  CLEAR_PROFILE,
} from './types';

// get curent profs profile

export const getCurentProfProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFPROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CLEAR_PROFPROFILE });
    dispatch({
      type: PROFPROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get all prof profiles

export const getProfProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFPROFILE });
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFPROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFPROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get all prof profile by id

export const getProfProfileById = (profId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/prof/${profId}`);

    dispatch({
      type: GET_PROFPROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFPROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Creat or update prof profile
export const createprofprofile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/profile', formData, config);
    dispatch({
      type: GET_PROFPROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    if (!edit) {
      history.push('/pdashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFPROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// DELETE PROF ACCOUNT & PROFILE
export const deleteProfAccount = () => async (dispatch) => {
  if (window.confirm('Êtes-vous sûr ? Ça ne peut pas être annulé!  ')) {
    try {
      await axios.delete('/api/profile');
      dispatch({ type: CLEAR_PROFPROFILE });
      dispatch({ type: PROFACCOUNT_DELETED });
      dispatch(setAlert('Votre compte a été définitivement supprimé '));
    } catch (err) {
      dispatch({
        type: PROFPROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
