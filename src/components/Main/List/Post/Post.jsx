import style from './Post.module.css';
import Content from './Content';
import Date from './Date';
import Thumbnail from './Thumbnail';
import Rating from './Rating';
import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';

export const Post = ({postData}) => {
  const {id, ups, createdAt, title, author, thumbnail, markdown} = postData;

  return (
    <li className={style.post}>
      <Thumbnail title={title} thumbnail={thumbnail} />
      <Content id={id} title={title} author={author} markdown={markdown} />
      <Rating ups={ups} />
      <Date timestamp={createdAt} />
      <DeleteButton />
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
