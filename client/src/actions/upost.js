import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_UPOSTS,
  UPOST_ERROR,
  UPDATE_ULIKES,
  GET_UPOST,
  ADD_UCOMMENT,
  REMOVE_UCOMMENT,
} from './types';

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

// ADD comment

export const addUcomment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Conetent-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_UCOMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: UPOST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Deelte comment

export const deleteUcomment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_UCOMMENT,
      payload: commentId,
    });
    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: UPOST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
