import {createSlice} from '@reduxjs/toolkit';
import {
  commentsRequestPending,
  commentsRequestSuccess,
  commentsRequestFailure,
} from './commentsAction';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

const processComments = (commentsData) =>
  commentsData.map(({data: comment}) => ({
    id: comment.id,
    author: comment.author,
    body: comment.body,
    createdAt: comment.created,
    ups: comment.score,
  }));

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(commentsRequestPending, (state) => {
        state.error = '';
        state.loading = true;
      })
      .addCase(commentsRequestSuccess, (state, action) => {
        state.data = processComments(action.payload.data || []);
        state.error = '';
        state.loading = false;
      })
      .addCase(commentsRequestFailure, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default commentsSlice.reducer;
