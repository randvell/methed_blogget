import style from './FormComment.module.css';
import {useAuth} from '../../../../../../hooks/useAuth';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Text from '../../../../../../UI/Text';
import {updateComment} from '../../../../../../store';

export const FormComment = () => {
  const value = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const {auth} = useAuth();
  const commentRef = useRef();

  const handleButtonClick = () => {
    setIsFormVisible(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Комментарий: ' + commentRef.current.value);
    commentRef.current.value = '';
    setIsFormVisible(false);
  };

  const handleCommentChange = (e) => {
    dispatch(updateComment(e.target.value));
  };

  useEffect(() => {
    if (isFormVisible && commentRef.current) {
      commentRef.current.focus();
    }
  }, [isFormVisible]);

  return (
    <>
      {!isFormVisible && (
        <button className={style.btn} onClick={handleButtonClick}>
          Отправить комментарий
        </button>
      )}
      {isFormVisible && (
        <form className={style.form} onSubmit={handleSubmit}>
          <Text size={14} tsize={18}>
            {auth.name}:
          </Text>
          <textarea
            className={style.textarea}
            ref={commentRef}
            onChange={handleCommentChange}
            value={value}
          ></textarea>
          <button className={style.btn}>Отправить</button>
        </form>
      )}
    </>
  );
};
