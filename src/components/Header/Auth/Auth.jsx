import style from './Auth.module.css';
import PropTypes from 'prop-types';
import {ReactComponent as AuthIcon} from './img/auth.svg';
import {authString} from '../../../api/auth';
import Text from '../../../UI/Text';
import {useState} from 'react';
import {useAuth} from '../../../hooks/useAuth';

export const Auth = () => {
  const {auth, unAuth} = useAuth();
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const handleAvatarClick = () => {
    setShowLogoutButton(!showLogoutButton);
  };

  return (
    <div className={style.container}>
      {auth?.name ? (
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
            <button className={style.logout} onClick={unAuth}>
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
  );
};

Auth.propTypes = {
  token: PropTypes.string,
};
