import {takeLatest, call, put, select} from 'redux-saga/effects';
import {
  postsRequest,
  postsRequestSuccess,
  postsRequestFailure,
  fetchPosts,
  changePage,
  postsRequestPending,
} from './postsAction';

function* handlePostsRequest(action) {
  try {
    const state = yield select();
    let page = state.posts.page;

    if (action.payload && page !== action.payload.page) {
      page = action.payload.page;
      yield put(changePage(page));
    }

    const token = state.token.token;
    const after = state.posts.after;
    const isLast = state.posts.isLast;
    const loading = state.posts.loading;

    if (loading) {
      return;
    }
    if (!token || isLast) {
      return;
    }

    yield put(postsRequestPending());

    const q = action.payload.q;
    const response = yield call(fetchPosts, page, token, after, q);

    yield put(postsRequestSuccess(response));
  } catch (error) {
    yield put(postsRequestFailure(error.toString()));
  }
}

export default function* postsSaga() {
  yield takeLatest(postsRequest.type, handlePostsRequest);
}
