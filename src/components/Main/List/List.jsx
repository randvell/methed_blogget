import style from './List.module.css';
import Post from './Post';
import {usePosts} from '../../../hooks/usePosts';
import {useAuth} from '../../../hooks/useAuth';
import Text from '../../../UI/Text';
import Preloader from '../../../UI/Preloader';
import {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {postsRequestAsync} from '../../../store/posts/postsAction';
import {Outlet, useParams} from 'react-router-dom';

export const List = () => {
  const {page} = useParams();
  const {posts, loading, error, isLocked} = usePosts();
  const {auth, loading: authLoading} = useAuth();
  const endList = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postsRequestAsync(page));
  }, [page, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isLocked && !loading && entries[0].isIntersecting) {
          dispatch(postsRequestAsync(page));
          console.log('counter++');
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

    return () => {
      if (endListCurrent) {
        observer.unobserve(endListCurrent);
      }
    };
  }, [dispatch, isLocked, loading, page]);

  if (error) {
    return <Text As="h3">Ошибка при загрузке</Text>;
  }
  if (!authLoading && !auth.name) {
    return <Text As="h3">Необходимо авторизоваться для просмотра постов</Text>;
  }
  if (!loading && (!posts || !posts.length)) {
    return <Text As="h3">Отсутствуют новые публикации</Text>;
  }

  return (
    <>
      <ul className={style.list}>
        {posts.map((postData) => (
          <Post key={postData.id} postData={postData} />
        ))}
        {loading && <Preloader />}
        <li ref={endList} className={style.end}></li>
      </ul>
      {isLocked && (
        <Text
          As="button"
          onClick={() => {
            dispatch(postsRequestAsync(page));
          }}
        >
          Загрузить еще
        </Text>
      )}
      <Outlet />
    </>
  );
};
