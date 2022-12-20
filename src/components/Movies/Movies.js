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
    <section className='movies'>
      <Header
        openMenu={openMenu}
        width={width}
        breakpointTable={breakpointTable}
        loggedIn={loggedIn}
      />
      <SearchForm />
      <MoviesCardList width={width} breakpointTable={breakpointTable} />
      <Footer width={width} breakpointMobile={breakpointMobile} />
    </section>
  );
}
