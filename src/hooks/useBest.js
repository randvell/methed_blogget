import {useContext, useEffect, useState} from 'react';
import {API_URL} from '../api/const';
import {tokenContext} from '../context/tokenContext';

export const useBest = () => {
  const {token, revokeToken} = useContext(tokenContext);
  const [best, setBest] = useState([]);

  const processPosts = (postsData) => {
    function isImageUrl(url) {
      const imageRegex = /\.(jpeg|jpg|gif|png|bmp|webp)$/i;
      return imageRegex.test(url);
    }

    const preparedPosts =
      postsData?.map(({data}) => ({
        id: data.id,
        createdAt: data.created,
        author: data.author,
        ups: data.score,
        title: data.title,
        thumbnail: isImageUrl(data.thumbnail) ? data.thumbnail : null,
        markdown: data.selftext,
      })) || [];

    setBest(preparedPosts);
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`${API_URL}/best`, {
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
        const posts = result?.data?.children || [];
        processPosts(posts);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  return {best};
};
