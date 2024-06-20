import style from './Logo.module.css';
import {ReactComponent as LogoSvg} from './img/logo.svg';

export const Logo = () => (
  <a className={style.link} href="/">
    <LogoSvg className={style.logo} alt="Логотип Blogget" />
  </a>
);
