import { REGISTERPROF_SUCCESS, REGISTERPROF_FAIL } from '../actions/types';

const initialState1 = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  prof: null,
};

export default function (state = initialState1, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTERPROF_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTERPROF_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
