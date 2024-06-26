import {useToast} from '../../hooks/useToast';
import {Toast} from '../Toast/Toast';
import style from './ToastPortal.module.css';
import ReactDOM from 'react-dom';

// import PropTypes from 'prop-types';

export const ToastPortal = () => {
  const {toasts, deleteToast} = useToast();

  return ReactDOM.createPortal(
    <div className={style.container}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          onClose={() => deleteToast(toast.id)}
        />
      ))}
    </div>,
    document.getElementById('toast-root')
  );
};
