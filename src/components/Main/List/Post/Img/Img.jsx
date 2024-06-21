import notPhoto from './img/notphoto.jpg';
import PropTypes from 'prop-types';
import style from './Img.module.css';

export const Img = ({postData}) => {
  const {title} = postData;
  return <img className={style.img} src={notPhoto} alt={title} />;
};

Img.propTypes = {
  className: PropTypes.string,
  postData: PropTypes.object,
};
