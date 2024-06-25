import {addToast, removeToast} from '../store/toast/action';
import {useDispatch, useSelector} from 'react-redux';

export const useToast = () => {
  const toasts = useSelector((state) => state.toasts);
  const dispatch = useDispatch();

  const showToast = (message) => {
    dispatch(addToast(message));
  };

  const deleteToast = (id) => {
    dispatch(removeToast(id));
  };

  return {toasts, addToast: showToast, deleteToast};
};
