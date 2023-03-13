import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import Preloader from '../Preloader/Preloader';

export default function Movies({
  loggedIn,
  width,
  breakpointTable,
  openMenu,
  breakpointMobile,
  findMovies,
  addToUserList,
  activeChooseShort,
  storageFilms,
  currentPath,
  isLoading,
  renderedFilms,
  showMoreFilms,
  savedFilms,
  onDeleteMovie,
  error,
  errorRequest,
  showUserFilms,
}) {
  return (
    <div className='page__wrapper'>
      <Header
        openMenu={openMenu}
        width={width}
        breakpointTable={breakpointTable}
        loggedIn={loggedIn}
      />
      <div className='main'>
        <SearchForm
          errorRequest={errorRequest}
          isLoading={isLoading}
          storageFilms={storageFilms}
          errorr={error}
          activeChooseShort={activeChooseShort}
          findMovies={findMovies}
          currentPath={currentPath}
        />
        {isLoading === true ? (
          <Preloader />
        ) : (
          <MoviesCardList
            showUserFilms={showUserFilms}
            onDeleteMovie={onDeleteMovie}
            savedFilms={savedFilms}
            showMoreFilms={showMoreFilms}
            renderedFilms={renderedFilms}
            currentPath={currentPath}
            storageFilms={storageFilms}
            addToUserList={addToUserList}
          />
        )}
      </div>

      <Footer width={width} breakpointMobile={breakpointMobile} />
    </div>
  );
}
