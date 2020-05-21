import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFPROFILE, PROFPROFILE_ERROR } from './types';

// get curent profs profile

export const getCurentProfProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

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
