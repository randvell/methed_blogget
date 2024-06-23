import Text from '../../../../../../UI/Text';
import {Comment} from './Comment/Comment';
import style from './Comments.module.css';
import PropTypes from 'prop-types';

export const Comments = ({comments}) => {
  if (!comments) {
    return <Text As="h3">Загрузка комментариев...</Text>;
  }

  return (
    <ul className={style.list}>
      {comments.length ? (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      ) : (
        <Text As="p" size={14} tsize={18}>
          Нет комментариев
        </Text>
      )}
    </ul>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
};
