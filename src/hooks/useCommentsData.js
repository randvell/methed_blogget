import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {commentsRequest} from '../store/comments/commentsAction';

export const useCommentsData = (articleId) => {
  const token = useSelector((state) => state.token.token);
  const comments = useSelector((state) => state.comments.data);
  const loading = useSelector((state) => state.comments.loading);
  const error = useSelector((state) => state.comments.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token || !articleId) {
      return;
    }

    dispatch(commentsRequest(articleId));
  }, [token, articleId, dispatch]);

  return {comments, loading, error};
};
