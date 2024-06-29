import {tokenMiddleware, tokenReducer} from './token/reducer';
import {formReducer} from './form/reducer';
import {authReducer} from './auth/reducer';
import postsReducer from './posts/postsSlice';
import commentsReducer from './comments/commentsSlice';
import {toastReducer} from './toast/reducer';
import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import {searchReducer} from './search/searchReducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    comment: formReducer,
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
    toasts: toastReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenMiddleware, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
