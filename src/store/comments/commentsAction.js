import axios from 'axios';
import {API_URL} from '../../api/const';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const commentsRequestAsync = createAsyncThunk(
  'comments/fetch',
  (articleId, {getState}) => {
    const token = getState().token.token;
    if (!token) {
      return;
    }

    return axios(`${API_URL}/comments/${articleId}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(({data}) => {
        const children = data?.[1]?.data?.children;
        const posts = children || [];
        return {data: posts};
      })
      .catch((err) => ({error: err.toString()}));
  }
);
