import style from './Post.module.css';
import PostBody from './PostBody';
import PostDate from './PostDate';
import PostImg from './PostImg';
import PostRating from './PostRating';
import PropTypes from 'prop-types';

export const Post = ({postData}) => {
  const {ups, date} = postData;

  return (
    <li className={style.post}>
      <PostImg className={style.img} postData={postData} />
      <PostBody className={style.content} postData={postData} />
      <PostRating className={style.rating} ups={ups} />
      <PostDate className={style.date} date={date} />
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
