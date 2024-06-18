import formatDate from '../../../../../utils/formatDate';
import PropTypes from 'prop-types';

export const PostDate = ({date, className}) => (
  <time className={className} dateTime={date}>
    {formatDate(date)}
  </time>
);

PostDate.propTypes = {
  className: PropTypes.string,
  date: PropTypes.string,
};
