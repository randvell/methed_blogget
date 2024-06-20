import style from './Post.module.css';
import Body from './Content';
import Date from './Date';
import Img from './Img';
import Rating from './Rating';
import PropTypes from 'prop-types';

export const Post = ({postData}) => {
  const {ups, date} = postData;

  return (
    <li className={style.post}>
      <Img className={style.img} postData={postData} />
      <Body className={style.content} postData={postData} />
      <Rating className={style.rating} ups={ups} />
      <Date className={style.date} date={date} />
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
