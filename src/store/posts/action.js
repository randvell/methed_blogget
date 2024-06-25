import axios from 'axios';
import {API_URL} from '../../api/const';

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';

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

export const postsRequestSuccess = ({data}) => ({
  type: POSTS_REQUEST_SUCCESS,
  data: processPosts(data),
});

export const postsRequestError = (err) => ({
  type: POSTS_REQUEST_ERROR,
  error: err,
});

export const postsRequestAsync = () => (dispatch, getState) => {
  const token = getState().token.token;
  if (!token) {
    return;
  }

  dispatch(postsRequest());

  axios(`${API_URL}/best`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(
      ({
        data: {
          data: {children},
        },
      }) => {
        const posts = children || [];
        dispatch(postsRequestSuccess({data: posts}));
      }
    )
    .catch((err) => {
      dispatch(postsRequestError(err.toString()));
    });
};
