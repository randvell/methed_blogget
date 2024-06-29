import {processPosts} from '../posts/postsSlice';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_REQUEST_SUCCESS = 'SEARCH_REQUEST_SUCCESS';
export const SEARCH_REQUEST_ERROR = 'SEARCH_REQUEST_ERROR';

export const searchRequest = (search) => ({
  type: SEARCH_REQUEST,
  search,
});

export const searchRequestSuccess = ({data, after}) => ({
  type: SEARCH_REQUEST_SUCCESS,
  data: processPosts(data || []),
  after,
});

export const searchRequestError = ({error}) => ({
  type: SEARCH_REQUEST_ERROR,
  error,
});
