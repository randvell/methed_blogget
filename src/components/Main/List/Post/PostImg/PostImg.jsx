import notPhoto from './img/notphoto.jpg';
import PropTypes from 'prop-types';

export const PostImg = ({className, postData}) => {
  const {title} = postData;
  return <img className={className} src={notPhoto} alt={title} />;
};

PostImg.propTypes = {
  className: PropTypes.string,
  postData: PropTypes.object,
};
