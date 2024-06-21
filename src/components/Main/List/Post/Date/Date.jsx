import formatDate from '../../../../../utils/formatDate';
import PropTypes from 'prop-types';
import style from './Date.module.css';

export const Date = ({date}) => (
  <time className={style.date} dateTime={date}>
    {formatDate(date)}
  </time>
);

Date.propTypes = {
  className: PropTypes.string,
  date: PropTypes.string,
};
