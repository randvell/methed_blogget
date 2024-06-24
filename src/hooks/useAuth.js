import {useEffect, useState} from 'react';
import {API_URL} from '../api/const';
import {useDispatch, useSelector} from 'react-redux';
import {deleteToken} from '../store';

export const useAuth = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const [auth, setAuth] = useState({});

  const unAuth = () => {
    setAuth();
    dispatch(deleteToken());
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
          dispatch(deleteToken());
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
