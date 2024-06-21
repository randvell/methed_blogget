import formatDate from '../../../../../utils/formatDate';
import PropTypes from 'prop-types';
import style from './Date.module.css';

export const DateComponent = ({timestamp}) => {
  const date = new Date(timestamp * 1000);

  return (
    <time className={style.date} dateTime={date.toISOString()}>
      {formatDate(date)}
    </time>
  );
};

DateComponent.propTypes = {
  timestamp: PropTypes.number,
};
