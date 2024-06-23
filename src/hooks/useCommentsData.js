import {useContext, useEffect, useState} from 'react';
import {API_URL} from '../api/const';
import {tokenContext} from '../context/tokenContext';

export const useCommentsData = (articleId) => {
  const {token, revokeToken} = useContext(tokenContext);
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
          revokeToken();
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
