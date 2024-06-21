import {useContext, useEffect, useState} from 'react';
import {API_URL} from '../api/const';
import {tokenContext} from '../context/tokenContext';

export const useAuth = () => {
  const {token, revokeToken} = useContext(tokenContext);
  const [auth, setAuth] = useState({});

  const unAuth = () => {
    setAuth();
    revokeToken();
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`${API_URL}/api/v1/me`, {
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
      .then(({name, icon_img: iconImg}) => {
        const img = iconImg?.replace(/\?.*$/, '');
        setAuth({name, img});
      })
      .catch((err) => {
        console.error(err);
        setAuth();
      });
  }, [token]);

  return {auth, unAuth};
};
