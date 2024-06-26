import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postsRequestAsync} from '../store/posts/action';

export const usePosts = (page) => {
  const token = useSelector((state) => state.token.token);
  const posts = useSelector((state) => state.posts.data);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }

    dispatch(postsRequestAsync());
  }, [token, page]);

  return {posts, loading, error};
};
