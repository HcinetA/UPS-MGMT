import axios from 'axios';
import { setAlert } from './alert';
import { REGISTERPROF_SUCCESS, REGISTERPROF_FAIL } from './types';

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
