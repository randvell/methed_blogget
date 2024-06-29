import {createSlice} from '@reduxjs/toolkit';
import {postsRequestAsync} from './postsAction';

const initialState = {
  loading: false,
  data: [],
  page: '',
  error: '',
  after: '',
  isLast: false,
  loadCount: 0,
};

export const processPosts = (postsData) => {
  function isImageUrl(url) {
    const imageRegex = /\.(jpeg|jpg|gif|png|bmp|webp)$/i;
    return imageRegex.test(url);
  }

  console.log(postsData);

  const preparedPosts =
    postsData?.map(({data}) => ({
      id: data.id,
      createdAt: data.created,
      author: data.author,
      ups: data.score,
      title: data.title,
      thumbnail: isImageUrl(data.thumbnail) ? data.thumbnail : null,
      markdown: data.selftext,
    })) || [];

  return preparedPosts;
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.data = [];
      state.page = action.payload;
      state.after = '';
      state.isLast = false;
      state.loadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postsRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(postsRequestAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) {
          return;
        }

        const postsData = action.payload.data;
        const after = action.payload.after;

        if (action.payload.append) {
          state.data = [...state.data, ...processPosts(postsData)];
          state.loadCount += 1;
        } else {
          state.data = processPosts(postsData);
          state.loadCount = 1;
        }
        state.after = after;
        state.isLast = !after;
      })
      .addCase(postsRequestAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch posts';
      });
  },
});

export const {changePage} = postsSlice.actions;
export default postsSlice.reducer;
