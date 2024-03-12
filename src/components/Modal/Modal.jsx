import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ isModalOn, handleModalClose, keyboardHandler, isSpinnerOn, image, description, handleImageLoaded }) => {
  
  useEffect(() => {
    window.addEventListener('keyup', keyboardHandler);

    return () => {
      window.removeEventListener('keyup', keyboardHandler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={isModalOn ? css.overlayVisible : css.overlay}
      onClick={handleModalClose}
      onKeyUp={handleModalClose}
    >
      <div className={css.modal}>
        <img
          className={isModalOn && !isSpinnerOn ? css.modalImgVisible : css.modalImg}
          src={image}
          alt={description}
          onLoad={handleImageLoaded}
        />
      </div>
    </div>
  );
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleImageLoaded: PropTypes.func.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  keyboardHandler: PropTypes.func.isRequired,
  isModalOn: PropTypes.bool.isRequired,
  isSpinnerOn: PropTypes.bool.isRequired,
};

export default Modal;
