import style from './Auth.module.css';
import PropTypes from 'prop-types';
import {ReactComponent as AuthIcon} from './img/auth.svg';
import {authString} from '../../../api/auth';
import Text from '../../../UI/Text';
import {useEffect, useState} from 'react';
import {useAuth} from '../../../hooks/useAuth';
import AuthLoader from './Loader';
import {useToast} from '../../../hooks/useToast';

export const Auth = () => {
  const {auth, unAuth, loading, error} = useAuth();
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const {addToast} = useToast();

  const handleLogout = () => {
    unAuth();
  };

  const handleAvatarClick = () => {
    setShowLogoutButton(!showLogoutButton);
  };

  useEffect(() => {
    if (error) {
      addToast(error);
    }
  }, [error]);

  return (
    <>
      <div className={style.container}>
        {loading ? (
          <AuthLoader />
        ) : auth?.name ? (
          <>
            <button className={style.btn} onClick={handleAvatarClick}>
              <img
                className={style.img}
                src={auth.img}
                title={auth.name}
                alt={`Аватар ${auth.name}`}
              />
            </button>
            {showLogoutButton && (
              <button className={style.logout} onClick={handleLogout}>
                Выйти
              </button>
            )}
          </>
        ) : (
          <Text className={style.authLink} As="a" href={authString}>
            <AuthIcon className={style.svg} />
          </Text>
        )}
      </div>
    </>
  );
};

Auth.propTypes = {
  token: PropTypes.string,
};
