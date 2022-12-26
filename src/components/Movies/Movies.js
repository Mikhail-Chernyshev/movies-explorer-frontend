import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

export default function Movies({
  loggedIn,
  width,
  breakpointTable,
  openMenu,
  breakpointMobile,
}) {
  return (
    <div className='page'>
      <Header
        openMenu={openMenu}
        width={width}
        breakpointTable={breakpointTable}
        loggedIn={loggedIn}
      />
      <div className='main'>
        <SearchForm />
        <MoviesCardList width={width} breakpointTable={breakpointTable} />
      </div>

      <Footer width={width} breakpointMobile={breakpointMobile} />
    </div>
  );
}
