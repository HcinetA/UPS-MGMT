import axios from 'axios';
import { setAlert } from './alert';
import { GET_UPOSTS, UPOST_ERROR, UPDATE_ULIKES, GET_UPOST } from './types';

//GET POSTS

export const getUposts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_UPOSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: UPOST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add LIKE

export const addUlike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/like/${postId}`);
    dispatch({
      type: UPDATE_ULIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: UPOST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//remove LIKE

export const removeUlike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/unlike/${postId}`);
    dispatch({
      type: UPDATE_ULIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: UPOST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//GET POST

export const getUpost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_UPOST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: UPOST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
