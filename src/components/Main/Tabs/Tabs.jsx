import {useEffect, useState} from 'react';
import {assignRandomId} from '../../../utils/generateRandomId';
import style from './Tabs.module.css';

import {ReactComponent as ArrowIcon} from './img/arrow.svg';
import {ReactComponent as HomeIcon} from './img/home.svg';
import {ReactComponent as TopIcon} from './img/top.svg';
import {ReactComponent as BestIcon} from './img/best.svg';
import {ReactComponent as HotIcon} from './img/hot.svg';

const LIST = [
  {value: 'Главная', href: '/', Icon: HomeIcon},
  {value: 'Топ', href: '/', Icon: TopIcon},
  {value: 'Лучшие', href: '/', Icon: BestIcon},
  {value: 'Горячие', href: '/', Icon: HotIcon},
].map(assignRandomId);

export const Tabs = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(true);

  const handleResize = () => {
    if (document.documentElement.clientWidth < 768) {
      setIsDropdown(true);
    } else {
      setIsDropdown(false);
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div className={style.container}>
      {isDropdown && (
        <div className={style.wrapperBtn}>
          <button
            className={style.btn}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {isDropdownOpen ? 'Close' : 'Open'}
            <ArrowIcon width={15} height={15} />
          </button>
        </div>
      )}

      {(!isDropdown || isDropdownOpen) && (
        <ul className={style.list} onClick={() => setIsDropdownOpen(false)}>
          {LIST.map(({id, value, Icon}) => (
            <li className={style.item} key={id}>
              <button className={style.btn}>
                {value}
                {Icon && <Icon width={30} height={30} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
