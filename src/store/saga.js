import {all} from 'redux-saga/effects';
import commentsSaga from './comments/commentsSaga';
import postsSaga from './posts/postsSaga';

export default function* rootSaga() {
  yield all([postsSaga(), commentsSaga()]);
}
