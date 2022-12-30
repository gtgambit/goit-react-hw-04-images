import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ onClickOpenModal, largeImageUrl }) => {
  const handleBackdrop = event => {
    if (event.target === event.currentTarget) {
      onClickOpenModal();
    }
  };
  useEffect(() => {
    const onCloseModal = () => {
      onClickOpenModal();
    };

    window.addEventListener('keydown', onCloseModal);
    return () => {
      window.removeEventListener('keydown', onCloseModal);
    };
  }, [onClickOpenModal]);

  return (
    <div className={css.Overlay} onClick={handleBackdrop}>
      <div className={css.Modal}>
        <img src={largeImageUrl} alt="Amazing photos" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageUrl: PropTypes.string,
  onImageClick: PropTypes.func,
};
