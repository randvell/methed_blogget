export const ADD_TOAST = 'ADD_TOAST';
export const REMOVE_TOAST = 'REMOVE_TOAST';

export const addToast = (message) => ({
  type: ADD_TOAST,
  payload: {
    id: Math.random().toString(36).substring(2, 9),
    message,
  },
});

export const removeToast = (id) => ({
  type: REMOVE_TOAST,
  payload: id,
});
