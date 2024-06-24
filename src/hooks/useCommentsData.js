import {useEffect, useState} from 'react';
import {API_URL} from '../api/const';
import {useDispatch, useSelector} from 'react-redux';
import {deleteToken} from '../store';

export const useCommentsData = (articleId) => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [comments, setComments] = useState();

  const prepareComments = (commentsData) =>
    commentsData.map(({data: comment}) => ({
      id: comment.id,
      author: comment.author,
      body: comment.body,
      createdAt: comment.created,
      ups: comment.score,
    }));

  useEffect(() => {
    if (!token || !articleId) {
      return;
    }

    fetch(`${API_URL}/comments/${articleId}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          dispatch(deleteToken());
          throw new Error('Unauthorized');
        }

        return response.json();
      })
      .then((result) => {
        const commentsData = result?.[1]?.data?.children;

        if (commentsData === undefined) {
          console.log(result);
          throw new Error('Не удалось загрузить комментарии');
        }

        setComments(prepareComments(commentsData));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token, articleId]);

  return {comments};
};
