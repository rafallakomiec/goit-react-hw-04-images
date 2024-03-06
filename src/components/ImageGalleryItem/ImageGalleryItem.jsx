import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({onClick, keyValue, image, description}) => {
  const onClickKeyify = () => () => onClick(keyValue);
  return (
    <li key={keyValue} className={css.imageGalleryItem} onClick={onClickKeyify()}>
      <img className={css.imageGalleryItemImage} src={image} alt={description} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  keyValue: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ImageGalleryItem;