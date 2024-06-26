import axios from 'axios';
import {API_URL} from '../../api/const';

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export const POSTS_REQUEST_SUCCESS_AFTER = 'POSTS_REQUEST_SUCCESS_AFTER';
export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';
export const CHANGE_PAGE = 'CHANGE_PAGE';

export const postsRequest = () => ({
  type: POSTS_REQUEST,
});

const processPosts = (postsData) => {
  function isImageUrl(url) {
    const imageRegex = /\.(jpeg|jpg|gif|png|bmp|webp)$/i;
    return imageRegex.test(url);
  }

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

export const postsRequestSuccess = ({data, after}) => ({
  type: POSTS_REQUEST_SUCCESS,
  data: processPosts(data),
  after,
});

export const postsRequestSuccessAfter = ({data, after}) => ({
  type: POSTS_REQUEST_SUCCESS_AFTER,
  data: processPosts(data),
  after,
});

export const postsRequestError = (err) => ({
  type: POSTS_REQUEST_ERROR,
  error: err,
});

export const changePage = (page) => ({
  type: CHANGE_PAGE,
  page,
});

export const postsRequestAsync = (newPage) => (dispatch, getState) => {
  let page = getState().posts.page;
  if (newPage && page !== newPage) {
    page = newPage;
    dispatch(changePage(newPage));
  }

  const token = getState().token.token;
  const loading = getState().posts.loading;
  const after = getState().posts.after;
  const isLast = getState().posts.isLast;

  if (!token || loading || isLast === true) {
    return;
  }

  dispatch(postsRequest());
  axios(`${API_URL}/${page}?limit=10${after ? `&after=${after}` : ''}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(
      ({
        data: {
          data: {after: postsAfter, children},
        },
      }) => {
        const posts = children || [];

        if (after) {
          dispatch(postsRequestSuccessAfter({data: posts, after: postsAfter}));
        } else {
          dispatch(postsRequestSuccess({data: posts, after: postsAfter}));
        }
      }
    )
    .catch((err) => {
      dispatch(postsRequestError(err.toString()));
    });
};
