// import style from './AuthRedirect.module.css';

import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  });
};
