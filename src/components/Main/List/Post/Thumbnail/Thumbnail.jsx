import notPhoto from './img/notphoto.jpg';
import PropTypes from 'prop-types';
import style from './Thumbnail.module.css';

export const Thumbnail = ({title, thumbnail}) => (
  <img className={style.img} src={thumbnail || notPhoto} alt={title} />
);

Thumbnail.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string,
};
