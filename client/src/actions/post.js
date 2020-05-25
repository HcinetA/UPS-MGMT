import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST1,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';

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

// DELETE POST

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// ADD POST

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Conetent-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`api/posts`, formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET POSTS

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST1,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// ADD comment

export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Conetent-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `/api/posts/comment/p/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Deelte comment

export const deleteComment = (postId, commentsprofId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/p/${postId}/${commentsprofId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentsprofId,
    });
    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
