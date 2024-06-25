import Preloader from '../../../../../../UI/Preloader';
import Text from '../../../../../../UI/Text';
import {useCommentsData} from '../../../../../../hooks/useCommentsData';
import {Comment} from './Comment/Comment';
import style from './Comments.module.css';
import PropTypes from 'prop-types';

export const Comments = ({id}) => {
  const {comments, loading, error} = useCommentsData(id);

  if (loading) {
    return <Preloader />;
  }
  if (error) {
    return <Text As="h3">Ошибка при загрузке</Text>;
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
  id: PropTypes.string,
};
