import {call, put, select, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {API_URL} from '../../api/const';
import {
  commentsRequest,
  commentsRequestPending,
  commentsRequestSuccess,
  commentsRequestFailure,
} from './commentsAction';

function* handleCommentsRequest(action) {
  try {
    const state = yield select();
    const token = state.token.token;
    const articleId = action.payload;

    if (!token) {
      yield put(commentsRequestFailure('No token provided'));
      return;
    }

    yield put(commentsRequestPending());

    const response = yield call(axios, `${API_URL}/comments/${articleId}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    console.log(response);

    const children = response.data?.[1]?.data?.children;
    const posts = children || [];

    yield put(commentsRequestSuccess({data: posts}));
  } catch (error) {
    yield put(commentsRequestFailure(error.toString()));
  }
}

export default function* commentsSaga() {
  yield takeLatest(commentsRequest.type, handleCommentsRequest);
}
