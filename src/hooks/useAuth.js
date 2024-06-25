import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authRequestAsync, authRevoke} from '../store/auth/action';
import {deleteToken} from '../store/token/action';

export const useAuth = () => {
  const token = useSelector((state) => state.token.token);
  const auth = useSelector((state) => state.auth.data);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();

  const unAuth = () => {
    dispatch(authRevoke());
    dispatch(deleteToken());
  };

  useEffect(() => {
    dispatch(authRequestAsync());
  }, [token]);

  return {auth, unAuth, loading, error};
};
