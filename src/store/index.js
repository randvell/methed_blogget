import {createStore} from 'redux';
import {DELETE_TOKEN, UPDATE_COMMENT, UPDATE_TOKEN} from '../utils/const';
import {getToken, setToken} from '../api/token';

const initialState = {
  comment: 'Привет Redux',
  token: getToken(),
};

export const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment,
});

export const updateToken = (token) => ({
  type: UPDATE_TOKEN,
  token,
});

export const deleteToken = () => ({
  type: DELETE_TOKEN,
});

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return {
        ...state,
        comment: action.comment,
      };
    case UPDATE_TOKEN:
      setToken(action.token);
      return {
        ...state,
        token: action.token,
      };
    case DELETE_TOKEN:
      setToken('');
      return {
        ...state,
        token: '',
      };
    default:
      return state;
  }
};

export const store = createStore(rootReducer);
