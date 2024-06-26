import {
  CHANGE_PAGE,
  POSTS_REQUEST,
  POSTS_REQUEST_ERROR,
  POSTS_REQUEST_SUCCESS,
  POSTS_REQUEST_SUCCESS_AFTER,
} from './action';

const initialState = {
  loading: false,
  data: [],
  page: '',
  error: '',
  after: '',
  isLast: false,
  loadCount: 0,
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case POSTS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        after: action.after,
        isLast: !action.after,
        loadCount: 1,
      };
    case POSTS_REQUEST_SUCCESS_AFTER:
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.data],
        after: action.after,
        isLast: !action.after,
        loadCount: state.loadCount + 1,
      };
    case POSTS_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        data: [],
        page: action.page,
        after: '',
        isLast: false,
        loadCount: 0,
      };
    default:
      return state;
  }
};
