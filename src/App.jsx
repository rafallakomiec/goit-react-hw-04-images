import css from './App.module.css';
import Searchbar from './components/Searchbar/Searchbar';
import fetchHandler from './utils/fetchHandlers/fetchHandler.js';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import { TailSpin } from 'react-loader-spinner';
import Modal from './components/Modal/Modal';
import { useEffect, useRef, useState } from 'react';


const PER_PAGE = 12;

const App = () => {
  const [pageNo, setPageNo] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [isSpinnerOn, setIsSpinnerOn] = useState(false);
  const [isModalOn, setIsModalOn] = useState(false);
  const [currentModal, setCurrentModal] = useState({});

  const prevSearchPhraseRef = useRef();
  prevSearchPhraseRef.current = searchPhrase;
  const prevPageNoRef = useRef();
  prevPageNoRef.current = pageNo;
  
  const keyboardHandler = event => {
    if (event.key === 'Escape') {
      setIsModalOn(false);
      setIsSpinnerOn(false);
      setCurrentModal({});
    }
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    const searchPhrase = event.target.elements.searchInput.value;
    setPageNo(1);
    setSearchPhrase(searchPhrase);
    setIsSpinnerOn(true);
  };

  const openModalHandler = (imageKey) => {
    const image = images.find(item => item.id == imageKey);

    setIsSpinnerOn(true);
    setIsModalOn(true);
    setCurrentModal({
      largeImageURL: image.largeImageURL,
      tags: image.tags
    });
  };

  const modalImageLoadedHandler = () => {
    setIsSpinnerOn(false);
  };

  const modalCloseHandler = event => {
    if (
      event.target.tagName === 'DIV' ||
      event.target.tagName === 'IMG' ||
      event.key === 'Escape'
    ) {
      setIsModalOn(false);
      setIsSpinnerOn(false);
      setCurrentModal({});
    }
  };

  const loadMoreHandler = () => {
    setPageNo(pageNo + 1);
    setIsSpinnerOn(true);
  };

  useEffect(() => { 
    window.addEventListener('keyup', keyboardHandler);

    return () => { 
      window.removeEventListener('keyup', keyboardHandler);
    };
  }, []);

  useEffect(async () => {
    if (prevSearchPhraseRef.current !== searchPhrase) { 
      const responseData = await fetchHandler(searchPhrase, pageNo, PER_PAGE);

      setImages(responseData.data.hits);
      setTotalHits(responseData.data.total);
      setIsSpinnerOn(false);
      return true;
    }
    
    if (prevSearchPhraseRef.current === searchPhrase && prevPageNoRef !== pageNo) {
      const responseData = await fetchHandler(searchPhrase, pageNo, PER_PAGE);
      setImages([...images, ...responseData.data.hits]);
      setIsSpinnerOn(false);
    }
  }, [prevSearchPhraseRef.current, prevPageNoRef.current]);

  return (
    <>
      <div className={css.app}>
        <Searchbar onSubmit={onSubmitHandler} />
        {images.length > 0 && <ImageGallery images={images} openModalHandler={openModalHandler} />}
        {totalHits - (PER_PAGE * this.state.pageNo) > 0 && (
          <Button onClick={loadMoreHandler} />
        )}
      </div>
      {isModalOn && (
        <Modal
          image={currentModal.largeImageURL}
          description={currentModal.tags}
          handleImageLoaded={modalImageLoadedHandler}
          handleModalClose={modalCloseHandler}
          isModalOn={isModalOn}
          isSpinnerOn={isSpinnerOn}
        />
      )}
      <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass={css.spinner}
        visible={isSpinnerOn}
      />
    </>
  );
}

export default App;