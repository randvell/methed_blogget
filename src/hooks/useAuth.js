import {useEffect, useState} from 'react';
import {useToken} from './useToken';
import {API_URL} from '../api/const';

export const useAuth = () => {
  const [token, setToken] = useToken('');
  const [auth, setAuth] = useState({});

  const unAuth = () => {
    setAuth({});
    setToken('');
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
          setToken('');
          throw new Error('Unauthorized');
        }

        return response.json();
      })
      .then(({name, icon_img: iconImg}) => {
        const img = iconImg?.replace(/\?.*$/, '');
        setAuth({name, img});
      })
      .catch((err) => {
        console.log(err);
        setAuth({});
      });
  }, [token]);

  return {auth, unAuth};
};
