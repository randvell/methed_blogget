import ReactDOM from 'react-dom';
import style from './Modal.module.css';
import {ReactComponent as CloseSvg} from './img/close.svg';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import Text from '../../UI/Text';
import {useEffect, useRef} from 'react';
import Comments from '../Main/List/Post/Content/Comments';
import FormComment from '../Main/List/Post/Content/FormComment';

export const Modal = ({id, title, author, markdown, closeModal}) => {
  const overlayRef = useRef(null);
  const handleClick = (e) => {
    const target = e.target;
    if (target === overlayRef.current) {
      closeModal();
    }
  };

  const handleEsc = ({key}) => {
    if (key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        <Text As="h2" className={style.title}>
          {title}
        </Text>
        <div className={style.content}>
          <Markdown
            options={{
              overrides: {
                a: {
                  props: {
                    target: '_blank',
                  },
                },
              },
            }}
          >
            {markdown || 'no text content'}
          </Markdown>
        </div>
        <Text As="p" className={style.author}>
          {author}
        </Text>

        <FormComment />
        <Comments id={id} />

        <button className={style.close} onClick={closeModal}>
          <CloseSvg />
        </button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

Modal.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  markdown: PropTypes.string,
  closeModal: PropTypes.func,
};
