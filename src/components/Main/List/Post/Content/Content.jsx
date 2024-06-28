import style from './Content.module.css';
import PropTypes from 'prop-types';
import Text from '../../../../../UI/Text';
import {Link, useParams} from 'react-router-dom';

export const Content = ({id, title, author}) => {
  const {page} = useParams();

  return (
    <div className={style.content}>
      <Text As="h2" className={style.title}>
        <Link className={style.linkPost} to={`/category/${page}/post/${id}`}>
          {title}
        </Link>
      </Text>
      <a className={`${style.linkAuthor} ${style.text}`} href="#author">
        {author}
      </a>
    </div>
  );
};

Content.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  markdown: PropTypes.string,
};
