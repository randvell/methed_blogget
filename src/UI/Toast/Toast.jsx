import style from './Toast.module.css';
import PropTypes from 'prop-types';

export const Toast = ({message, onClose}) => (
  <div className={style.toast}>
    <span>{message}</span>
    <button className={style.btn} onClick={onClose}>X</button>
  </div>
);

Toast.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
};
