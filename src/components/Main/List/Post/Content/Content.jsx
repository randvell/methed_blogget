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
          <Text As="a" size={14} tsize={22} className={style.linkPost}>
            {title}
          </Text>
        </Link>
      </Text>
      <Text
        As="a"
        size={12}
        tsize={14}
        className={style.linkAuthor}
        href="#author"
      >
        {author}
      </Text>
    </div>
  );
};

Content.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  markdown: PropTypes.string,
};
