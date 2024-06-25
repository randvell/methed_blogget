import {combineReducers, createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension';
import {tokenMiddleware, tokenReducer} from './token/reducer';
import {formReducer} from './form/reducer';
import {thunk} from 'redux-thunk';
import {authReducer} from './auth/reducer';
import {postsReducer} from './posts/reducer';
import {commentsReducer} from './comments/reducer';
import {toastReducer} from './toast/reducer';

const rootReducer = combineReducers({
  token: tokenReducer,
  comment: formReducer,
  auth: authReducer,
  posts: postsReducer,
  comments: commentsReducer,
  toasts: toastReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(tokenMiddleware, thunk))
);
