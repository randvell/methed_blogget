import style from './Post.module.css';
import Content from './Content';
import Date from './Date';
import Thumbnail from './Thumbnail';
import Rating from './Rating';
import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';

export const Post = ({postData}) => {
  const {ups, createdAt, title, author, thumbnail} = postData;

  return (
    <li className={style.post}>
      <Thumbnail title={title} thumbnail={thumbnail} />
      <Content title={title} author={author} />
      <Rating ups={ups} />
      <Date timestamp={createdAt} />
      <DeleteButton />
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
