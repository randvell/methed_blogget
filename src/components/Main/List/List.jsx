import style from './List.module.css';
import Post from './Post';
import {useBest} from '../../../hooks/useBest';
import {useAuth} from '../../../hooks/useAuth';
import Text from '../../../UI/Text';
import Preloader from '../../../UI/Preloader';
import {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {postsRequestAsync} from '../../../store/posts/action';

export const List = () => {
  const {posts, loading, error} = useBest();
  const {auth, loading: authLoading} = useAuth();
  const endList = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!loading && entries[0].isIntersecting) {
          dispatch(postsRequestAsync());
        }
      },
      {
        rootMargin: '100px',
      }
    );

    const endListCurrent = endList.current;
    if (endListCurrent) {
      observer.observe(endListCurrent);
    }
  }, [endList.current, loading]);

  if (error) {
    return <Text As="h3">Ошибка при загрузке</Text>;
  }
  if (!authLoading && !auth.name) {
    return <Text As="h3">Необходимо авторизоваться для просмотра постов</Text>;
  }
  if (!loading && !posts && !posts.length) {
    return <Text As="h3">Отсутствуют новые публикации</Text>;
  }

  return (
    <ul className={style.list}>
      {posts.map((postData) => (
        <Post key={postData.id} postData={postData} />
      ))}
      {loading && <Preloader />}
      <li ref={endList} className={style.end}></li>
    </ul>
  );
};
