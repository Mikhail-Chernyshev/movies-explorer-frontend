import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

export default function SavedMovies({
  loggedIn,
  width,
  breakpointTable,
  openMenu,
  breakpointMobile,
  movies,
  currentPath,
  checkedOrNotCheched,
  isChooseShort,
  activeChooseShort,
  findMovies,
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
          currentPath={currentPath}
          isChooseShort={isChooseShort}
          checkedOrNotCheched={checkedOrNotCheched}
          activeChooseShort={activeChooseShort}
          findMovies={findMovies}
          savedMovies={movies}
          // setSearch={setSearch}
          // getAllMovies={getAllMovies}
        />
        <MoviesCardList
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
