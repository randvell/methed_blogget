export const setToken = (token) => {
  if (token) {
    localStorage.setItem('bearer', token);
  } else {
    localStorage.removeItem('bearer');
  }
};

export const getToken = () => {
  let token = '';

  if (location.pathname.includes('/auth')) {
    token = new URLSearchParams(location.hash.substring(1)).get('access_token');

    if (token) {
      setToken(token);
      return token;
    }
  }

  if (localStorage.getItem('bearer')) {
    token = localStorage.getItem('bearer');
    setToken(token);
  }

  return token;
};
