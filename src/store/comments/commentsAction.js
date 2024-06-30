import {createAction} from '@reduxjs/toolkit';

export const commentsRequest = createAction('comments/fetch');
export const commentsRequestPending = createAction('comments/fetchPending');
export const commentsRequestSuccess = createAction('comments/fetchSuccess');
export const commentsRequestFailure = createAction('comments/fetchFailure');
