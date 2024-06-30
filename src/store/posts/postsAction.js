import axios from 'axios';
import {API_URL} from '../../api/const';
import {createAction} from '@reduxjs/toolkit';

export const postsRequest = createAction('posts/fetchPosts');
export const postsRequestPending = createAction('posts/fetchPostsPending');
export const postsRequestSuccess = createAction('posts/fetchPostsSuccess');
export const postsRequestFailure = createAction('posts/fetchPostsFailure');
export const changePage = createAction('posts/changePage');

export const fetchPosts = async (page, token, after, q) => {
  const isSearch = page === 'search';
  const params = new URLSearchParams();
  params.append('limit', '10');
  if (isSearch) {
    params.append('q', q);
  }
  if (after) {
    params.append('after', after);
  }

  const url = `${API_URL}/${page}?${params.toString()}`;
  const response = await axios(url, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });

  const {after: postsAfter, children} = response.data.data;
  return {data: children || [], after: postsAfter, append: !!after};
};
