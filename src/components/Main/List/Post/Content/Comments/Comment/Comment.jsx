import Text from '../../../../../../../UI/Text';
import Date from '../../../Date';
import style from './Comment.module.css';
import PropTypes from 'prop-types';

export const Comment = ({comment}) => {
  const {body, author, createdAt} = comment;
  return (
    <li className={style.item}>
      <Text As="h3" className={style.author} size={18} tsize={22}>
        {author}
      </Text>
      <Text As="p" className={style.comment} size={14} tsize={18}>
        {body}
      </Text>
      <Date timestamp={createdAt} />
    </li>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  body: PropTypes.string,
  author: PropTypes.string,
  createdAt: PropTypes.number,
  ups: PropTypes.number,
};
