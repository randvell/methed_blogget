import formatDate from '../../../../../utils/formatDate';
import PropTypes from 'prop-types';

export const Date = ({date, className}) => (
  <time className={className} dateTime={date}>
    {formatDate(date)}
  </time>
);

Date.propTypes = {
  className: PropTypes.string,
  date: PropTypes.string,
};
