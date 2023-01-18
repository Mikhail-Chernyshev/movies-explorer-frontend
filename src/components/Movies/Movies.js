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
  getAllMovies,
  films,
  setSearch,
  findMovies,
  searchFilms,
  addToUserList,
  activeChooseShort,
  isChooseShort,
  checkedOrNotCheched,
  storageFilms,
  currentPath,
  isLoading,
  setSearchValue,
  setChooseShort,
  renderedFilms,
  showMoreFilms,
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
        {isLoading ? <Preloader /> : ''}

        <SearchForm
          allMovies={films}
          setChooseShort={setChooseShort}
          setSearchValue={setSearchValue}
          isChooseShort={isChooseShort}
          checkedOrNotCheched={checkedOrNotCheched}
          activeChooseShort={activeChooseShort}
          findMovies={findMovies}
          setSearch={setSearch}
          getAllMovies={getAllMovies}
          currentPath={currentPath}
        />
        <MoviesCardList
          showMoreFilms={showMoreFilms}
          renderedFilms={renderedFilms}
          currentPath={currentPath}
          storageFilms={storageFilms}
          addToUserList={addToUserList}
          searchFilms={searchFilms}
          films={films}
          width={width}
          breakpointTable={breakpointTable}
        />
      </div>

      <Footer width={width} breakpointMobile={breakpointMobile} />
    </div>
  );
}
