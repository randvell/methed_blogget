import style from './List.module.css';
import Post from './Post';
import {useBest} from '../../../hooks/useBest';
import {useAuth} from '../../../hooks/useAuth';
import Text from '../../../UI/Text';
import Preloader from '../../../UI/Preloader';

export const List = () => {
  const {auth} = useAuth();
  const {posts, loading, error} = useBest();

  if (!auth.name) {
    return <Text As="p">Необходимо авторизоваться для просмотра постов</Text>;
  }
  if (loading) {
    return <Preloader />;
  }
  if (error) {
    return <Text As="h3">Ошибка при загрузке</Text>;
  }

  return (
    <ul className={style.list}>
      {posts && posts.length ? (
        posts.map((postData) => <Post key={postData.id} postData={postData} />)
      ) : (
        <Text As="h3">Отсутствуют новые публикации</Text>
      )}
    </ul>
  );
};
