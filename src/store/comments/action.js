import axios from 'axios';
import {API_URL} from '../../api/const';

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_REQUEST_SUCCESS = 'COMMENTS_REQUEST_SUCCESS';
export const COMMENTS_REQUEST_ERROR = 'COMMENTS_REQUEST_ERROR';

export const commentsRequest = () => ({
  type: COMMENTS_REQUEST,
});

const processComments = (commentsData) =>
  commentsData.map(({data: comment}) => ({
    id: comment.id,
    author: comment.author,
    body: comment.body,
    createdAt: comment.created,
    ups: comment.score,
  }));

export const commentsRequestSuccess = ({data}) => ({
  type: COMMENTS_REQUEST_SUCCESS,
  data: processComments(data),
});

export const commentsRequestError = (err) => ({
  type: COMMENTS_REQUEST_ERROR,
  error: err,
});

export const commentsRequestAsync = (articleId) => (dispatch, getState) => {
  const token = getState().token.token;
  if (!token) {
    return;
  }

  dispatch(commentsRequest());

  axios(`${API_URL}/comments/${articleId}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(({data}) => {
      const children = data?.[1]?.data?.children;
      const posts = children || [];
      dispatch(commentsRequestSuccess({data: posts}));
    })
    .catch((err) => {
      dispatch(commentsRequestError(err.toString()));
    });
};
