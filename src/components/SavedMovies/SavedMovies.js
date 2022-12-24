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
}) {
  return (
    <div className='saved-movies'>
      <Header
        openMenu={openMenu}
        width={width}
        breakpointTable={breakpointTable}
        loggedIn={loggedIn}
      />
      <div className='main'>
        <SearchForm />
        <MoviesCardList />
      </div>

      <Footer width={width} breakpointMobile={breakpointMobile} />
    </div>
  );
}
