import style from './PostRating.module.css';
import PropTypes from 'prop-types';

export const PostRating = ({ups, className}) => (
  <div className={className}>
    <button className={style.up} aria-label="Повысить рейтинг" />
    <p className={style.ups}>{ups}</p>
    <button className={style.down} aria-label="Понизить рейтинг" />
  </div>
);

PostRating.propTypes = {
  ups: PropTypes.number,
  className: PropTypes.string,
};
