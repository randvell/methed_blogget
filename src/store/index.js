import {tokenMiddleware, tokenReducer} from './token/reducer';
import {formReducer} from './form/reducer';
import {authReducer} from './auth/reducer';
import postsReducer from './posts/postsSlice';
import commentsReducer from './comments/commentsSlice';
import {toastReducer} from './toast/reducer';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    comment: formReducer,
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
    toasts: toastReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenMiddleware),
});
