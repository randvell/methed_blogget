import {useState, useEffect} from 'react';

export const useToken = (initialState) => {
  const [token, setToken] = useState(initialState);

  useEffect(() => {
    if (location.pathname.includes('/auth')) {
      const token = new URLSearchParams(location.hash.substring(1)).get(
        'access_token'
      );

      setToken(token);
    } else if (localStorage.getItem('bearer')) {
      setToken(localStorage.getItem('bearer'));
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('bearer', token);
    } else {
      localStorage.removeItem('bearer');
    }
  }, [token]);

  return [token, setToken];
};
