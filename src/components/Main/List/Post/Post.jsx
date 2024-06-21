import style from './Post.module.css';
import Body from './Content';
import Date from './Date';
import Thumbnail from './Thumbnail';
import Rating from './Rating';
import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';

export const Post = ({postData}) => {
  const {ups, date} = postData;

  return (
    <li className={style.post}>
      <Thumbnail postData={postData} />
      <Body postData={postData} />
      <Rating ups={ups} />
      <Date date={date} />
      <DeleteButton />
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
