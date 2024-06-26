import {Link} from 'react-router-dom';
import style from './Logo.module.css';
import {ReactComponent as LogoSvg} from './img/logo.svg';

export const Logo = () => (
  <Link className={style.link} to="/">
    <LogoSvg className={style.logo} alt="Логотип Blogget" />
  </Link>
);
