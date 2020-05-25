import axios from 'axios';
import { setAlert } from './alert';
import { GET_POST, POST_ERROR, UPDATE_LIKES } from './types';

// GET POSTS

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/like/p/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likesporf: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// remove like

export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/unlike/p/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likesporf: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
