import {
  AUTH_LOGOUT,
  AUTH_REQUEST,
  AUTH_REQUEST_ERROR,
  AUTH_REQUEST_SUCCESS,
} from './action';

const initialState = {
  loading: false,
  data: {},
  error: '',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case AUTH_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.error,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        data: {},
      };
    default:
      return state;
  }
};
