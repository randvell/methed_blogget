import Text from '../../../../../UI/Text';
import style from './Rating.module.css';
import PropTypes from 'prop-types';

export const Rating = ({ups}) => (
  <div className={style.rating}>
    <button className={style.up} aria-label="Повысить рейтинг" />
    <Text As="p" size={12} tsize={14} className={style.ups}>
      {ups}
    </Text>
    <button className={style.down} aria-label="Понизить рейтинг" />
  </div>
);

Rating.propTypes = {
  ups: PropTypes.number,
};
