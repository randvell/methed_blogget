import {ADD_TOAST, REMOVE_TOAST} from './action';

const initialState = [];

export const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOAST:
      return [...state, action.payload];
    case REMOVE_TOAST:
      return state.filter((toast) => toast.id !== action.payload);
    default:
      return state;
  }
};
