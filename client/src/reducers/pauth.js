import {
  REGISTERPROF_SUCCESS,
  REGISTERPROF_FAIL,
  PROF_LOADED,
  PAUTH_ERROR,
  LOGINPROF_FAIL,
  LOGINPROF_SUCCESS,
  LOGOUTPROF,
  PROFACCOUNT_DELETED,
} from '../actions/types';

const initialState1 = {
  token: localStorage.getItem('token'),
  pisAuthenticated: null,
  ploading: true,
  prof: null,
};

export default function (state = initialState1, action) {
  const { type, payload } = action;

  switch (type) {
    case PROF_LOADED:
      return {
        ...state,
        pisAuthenticated: true,
        ploading: false,
        prof: payload,
      };
    case REGISTERPROF_SUCCESS:
    case LOGINPROF_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        pisAuthenticated: true,
        ploading: false,
      };
    case REGISTERPROF_FAIL:
    case PAUTH_ERROR:
    case LOGINPROF_FAIL:
    case LOGOUTPROF:
    case PROFACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        pisAuthenticated: false,
        ploading: false,
      };

    default:
      return state;
  }
}
