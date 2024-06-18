import DeleteButton from './DeleteButton';
import style from './PostBody.module.css';
import PropTypes from 'prop-types';

export const PostBody = ({className, postData}) => {
  const {title, author} = postData;
  return (
    <div className={className}>
      <h2 className={style.title}>
        <a className={style.linkPost} href="#">
          {title}
        </a>
      </h2>
      <a className={style.linkAuthor} href="#author">
        {author}
      </a>
      <DeleteButton />
    </div>
  );
};

PostBody.propTypes = {
  className: PropTypes.string,
  postData: PropTypes.object,
};
