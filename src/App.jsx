import { useState, useEffect } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Loader } from './components/Loader/Loader';
import { Button } from './components/Button/Button';
import { Modal } from './components/Modal/Modal';
import { fetchPhotos } from 'Services/Api';
import css from './App.module.css';

export const App = () => {
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [btnShow, setBtnShow] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState(null);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchPictures = async () => {
      try {
        setIsLoader(true);
        const data = await fetchPhotos(query, page);
        setIsLoader(false);
        if (!data.hits.length) {
          alert('нема таких фото');
          return;
        }
        if (page === Math.ceil(data.totalHits / 12)) {
          setPhotos(data.hits);
          setBtnShow(false);
          alert('Фото скінчились');
          return;
        }
        setPhotos(prevPhotos => [...prevPhotos, ...data.hits]);
        setBtnShow(true);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchPictures();
  }, [query, page]);

  const onFormSubmit = query => {
    setQuery(query);
    setPhotos([]);
    setPage(1);
  };

  const onButtonClick = () => {
    setPage(prevState => prevState + 1);
  };

  const onClickOpenModal = largeImageUrl => {
    setLargeImageUrl(largeImageUrl);
  };

  return (
    <div className={css.App}>
      <Searchbar searchBar={onFormSubmit} />
      <ImageGallery
        imageGallery={photos}
        onClickOpenModal={onClickOpenModal}
      ></ImageGallery>
      {isLoader && <Loader />}
      {btnShow && <Button onButtonClick={onButtonClick} />}
      {largeImageUrl && (
        <Modal
          onClickOpenModal={onClickOpenModal}
          largeImageUrl={largeImageUrl}
        />
      )}
    </div>
  );
};
