import style from './DeleteButton.module.css';
import {ReactComponent as DelIcon} from './img/icon.svg';

export const DeleteButton = () => {
  console.log();
  return (
    <button className={style.delete} aria-label="Удалить пост">
      <DelIcon />
    </button>
  );
};
