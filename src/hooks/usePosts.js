import {useSelector} from 'react-redux';

export const usePosts = () => {
  const posts = useSelector((state) => state.posts.data);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);
  const isLocked = useSelector((state) => state.posts.loadCount) >= 2;

  return {posts, loading, error, isLocked};
};
