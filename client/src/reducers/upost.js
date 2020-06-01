import {
  GET_UPOSTS,
  UPOST_ERROR,
  UPDATE_ULIKES,
  GET_UPOST,
} from '../actions/types';
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_UPOSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_UPOST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case UPOST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_ULIKES:
      return {
        ...state,
        posts: state.posts.map((upost) =>
          upost.id === payload.id ? { ...upost, likes: payload.likes } : upost
        ),
        loading: false,
      };
    default:
      return state;
  }
}
