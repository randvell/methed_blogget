import axios from 'axios';
import {API_URL} from '../../api/const';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {changePage} from './postsSlice';

export const postsRequestAsync = createAsyncThunk(
  'posts/fetchPosts',
  (newPage, {getState, rejectWithValue, dispatch}) => {
    const state = getState();

    let page = getState().posts.page;
    if (newPage && page !== newPage) {
      page = newPage;
      dispatch(changePage(newPage));
    }

    const token = state.token.token;
    const after = state.posts.after;
    const isLast = state.posts.isLast;

    if (!token || isLast) {
      return rejectWithValue('Request not allowed');
    }

    return axios(
      `${API_URL}/${page}?limit=10${after ? `&after=${after}` : ''}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    )
      .then((response) => {
        const {after: postsAfter, children} = response.data.data;
        return {data: children || [], after: postsAfter, append: !!after};
      })
      .catch((err) => rejectWithValue(err.toString()));
  }
);
