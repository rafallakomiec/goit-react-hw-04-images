import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { nanoid } from 'nanoid';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({images, openModalHandler}) => {
  const imageGalleryItems = images.map(item => {
    return (
      <ImageGalleryItem
        key={nanoid()}
        keyValue={item.id.toString()}
        description={item.tags}
        image={item.webformatURL}
        onClick={openModalHandler}
      />
    );
  });
  
  return <ul className={css.imageGallery}>{imageGalleryItems}</ul>;
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModalHandler: PropTypes.func.isRequired
};

export default ImageGallery;
