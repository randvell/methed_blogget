import {call, put, select, takeLatest} from 'redux-saga/effects';
import {API_URL} from '../../api/const';
import axios from 'axios';
import {SEARCH_REQUEST, searchRequestSuccess} from './searchAction';

const fetchSearch = async (search, token) => {
  const request = await axios(`${API_URL}/search?q=${search}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });

  return request.data;
};

function* workerSearch(action) {
  const token = yield select((state) => state.token.token);
  const {data} = yield call(fetchSearch, action.search, token);

  yield put(searchRequestSuccess({data: data.children, after: data.after}));
}

export function* watchSearch() {
  yield takeLatest(SEARCH_REQUEST, workerSearch);
}
