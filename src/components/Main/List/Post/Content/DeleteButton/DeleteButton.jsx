import InlineSvg from '../../../../../../UI/InlineSvg';
import style from './DeleteButton.module.css';

export const DeleteButton = () => {
  console.log();
  return (
    <button className={style.delete} aria-label="Удалить пост">
      <InlineSvg href={'./assets/del-icon.svg'} />
    </button>
  );
};
