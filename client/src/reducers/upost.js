import {
  GET_UPOSTS,
  UPOST_ERROR,
  UPDATE_ULIKES,
  GET_UPOST,
  ADD_UCOMMENT,
  REMOVE_UCOMMENT,
  GET_UPOSTClASSE,
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
    case GET_UPOSTClASSE:
      return {
        ...state,
        posts: payload,
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
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case ADD_UCOMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case REMOVE_UCOMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
}
