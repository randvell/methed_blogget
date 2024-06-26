import axios from 'axios';
import {API_URL} from '../../api/const';
import {deleteToken} from '../token/action';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const authRequest = () => ({
  type: AUTH_REQUEST,
});

export const authRequestSuccess = ({data}) => ({
  type: AUTH_REQUEST_SUCCESS,
  data,
});

export const authRequestError = (err) => ({
  type: AUTH_REQUEST_ERROR,
  error: err,
});

export const authRevoke = () => ({
  type: AUTH_LOGOUT,
  data: {},
});

export const authRequestAsync = () => (dispatch, getState) => {
  const token = getState().token.token;
  const loading = getState().auth.loading;
  if (!token) {
    return;
  }
  if (loading) {
    return;
  }

  dispatch(authRequest());

  axios(`${API_URL}/api/v1/me`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(({data: {name, icon_img: iconImg}}) => {
      const img = iconImg?.replace(/\?.*$/, '');
      dispatch(authRequestSuccess({data: {name, img}}));
    })
    .catch((err) => {
      console.error(err);
      dispatch(deleteToken());
      dispatch(authRequestError(err.toString()));
    });
};
