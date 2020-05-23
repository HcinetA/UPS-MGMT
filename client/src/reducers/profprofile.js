import {
  GET_PROFPROFILE,
  PROFPROFILE_ERROR,
  CLEAR_PROFPROFILE,
  GET_PROFPROFILES,
} from '../actions/types';

const pinitialState = {
  profprofile: null,
  profprofiles: [],
  ploading: true,
  errors: {},
};

export default function (state = pinitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFPROFILE:
      return {
        ...state,
        profprofile: payload,
        ploading: false,
      };
    case GET_PROFPROFILES:
      return {
        ...state,
        profprofiles: payload,
        ploading: false,
      };
    case PROFPROFILE_ERROR:
      return {
        ...state,
        error: payload,
        ploading: false,
      };
    case CLEAR_PROFPROFILE:
      return {
        ...state,
        profprofile: null,
        ploading: false,
      };
    default:
      return state;
  }
}
