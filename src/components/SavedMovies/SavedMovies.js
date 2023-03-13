import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

export default function SavedMovies({
  onDeleteMovie,
  loggedIn,
  width,
  breakpointTable,
  openMenu,
  breakpointMobile,
  movies,
  currentPath,
  activeChooseShort,
  findMovies,
  findMoviesUser,
  setUserFilms,
  userFilms,
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
          findMoviesUser={findMoviesUser}
          currentPath={currentPath}
          activeChooseShort={activeChooseShort}
          findMovies={findMovies}
        />
        <MoviesCardList
          setUserFilms={setUserFilms}
          userFilms={userFilms}
          onDeleteMovie={onDeleteMovie}
          currentPath={currentPath}
          savedFilms={movies}
          width={width}
          breakpointTable={breakpointTable}
        />
      </div>

      <Footer width={width} breakpointMobile={breakpointMobile} />
    </div>
  );
}
