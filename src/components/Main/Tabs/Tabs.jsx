import {useEffect, useState} from 'react';
import {assignRandomId} from '../../../utils/generateRandomId';
import style from './Tabs.module.css';

import {ReactComponent as ArrowIcon} from './img/arrow.svg';
import {ReactComponent as HomeIcon} from './img/home.svg';
import {ReactComponent as TopIcon} from './img/top.svg';
import {ReactComponent as BestIcon} from './img/best.svg';
import {ReactComponent as HotIcon} from './img/hot.svg';
import {useNavigate, useParams} from 'react-router-dom';
import Text from '../../../UI/Text';

const LIST = [
  {value: 'Главная', Icon: HomeIcon, link: ''},
  {value: 'Топ', Icon: TopIcon, link: 'top'},
  {value: 'Лучшие', Icon: BestIcon, link: 'best'},
  {value: 'Горячие', Icon: HotIcon, link: 'hot'},
].map(assignRandomId);

export const Tabs = () => {
  const {page} = useParams();
  const currentPage = LIST.find(({link}) => link === page);
  console.log(page);
  console.log(currentPage);

  const [topMenuText, setTopMenuText] = useState(
    currentPage?.value || 'Главная'
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(true);

  const navigate = useNavigate();

  const handleResize = () => {
    if (document.documentElement.clientWidth < 768) {
      setIsDropdown(true);
    } else {
      setIsDropdown(false);
    }
  };

  const handleMenuSelect = (value) => {
    setIsDropdownOpen(false);
    setTopMenuText(value);
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
            {topMenuText}
            <ArrowIcon width={15} height={15} />
          </button>
        </div>
      )}

      {(!isDropdown || isDropdownOpen) && (
        <ul className={style.list} onClick={() => setIsDropdownOpen(false)}>
          {LIST.map(({id, value, Icon, link}) => (
            <li className={style.item} key={id}>
              <Text
                As="button"
                className={style.btn}
                onClick={() => {
                  handleMenuSelect(value);
                  navigate(link ? `/category/${link}` : '/');
                }}
              >
                {value}
                {Icon && <Icon width={30} height={30} />}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
