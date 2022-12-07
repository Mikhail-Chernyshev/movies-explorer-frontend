import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

export default function SavedMovies({ loggedIn }) {
  return (
    <div className='saved-movies'>
      <Header loggedIn={loggedIn} />
      <SearchForm/>
      <MoviesCardList/>
      <Footer />
    </div>
  );
}
