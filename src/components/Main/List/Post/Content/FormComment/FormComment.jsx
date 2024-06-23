import style from './FormComment.module.css';

import Text from '../../../../../../UI/Text';
import {useAuth} from '../../../../../../hooks/useAuth';
import {useEffect, useRef, useState} from 'react';

export const FormComment = () => {
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
          <textarea className={style.textarea} ref={commentRef}></textarea>
          <button className={style.btn}>Отправить</button>
        </form>
      )}
    </>
  );
};
