import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({
  width,
  breakpointTable,
  films,
  addToUserList,
  searchFilms,
  storageFilms,
  currentPath,
  savedFilms,
  renderedFilms,
  showMoreFilms,
  onDeleteMovie,
}) {
  console.log(currentPath);

  // if (width > breakpointTable) {
  return (
    <ul className='movies-card-list'>
      {currentPath === '/movies' && storageFilms
        ? storageFilms
            .map((film) => {
              return (
                <MoviesCard
                  onDeleteMovie={onDeleteMovie}
                  savedFilms={savedFilms}
                  currentPath={currentPath}
                  addToUserList={addToUserList}
                  id={film.id}
                  key={currentPath === '/movies' ? film.id : film._id}
                  duration={film.duration}
                  imagee={film.image}
                  name={film.nameEN}
                  film={film}
                />
              );
            })
            .slice(0, renderedFilms)
        : currentPath === '/saved-movies' && savedFilms
        ? savedFilms.map((film) => {
            return (
              <MoviesCard
                savedFilms={savedFilms}
                onDeleteMovie={onDeleteMovie}
                currentPath={currentPath}
                addToUserList={addToUserList}
                id={film.id}
                key={currentPath === '/movies' ? film.id : film._id}
                duration={film.duration}
                imagee={film.image}
                name={film.nameEN}
                film={film}
              />
            );
          })
        : ''}

      {currentPath === '/movies' &&
      storageFilms &&
      storageFilms.length > renderedFilms ? (
        <div className='movies-card-list__else'>
          <button
            onClick={showMoreFilms}
            className='movies-card-list__else-button'
          >
            Else
          </button>
        </div>
      ) : (
        ''
      )}
    </ul>
  );
  // }
  // return (
  //   <section className='movies-card-list'>
  //     {searchFilms
  //       ? searchFilms.map((film) => {
  //           return (
  //             <MoviesCard
  //               addToUserList={addToUserList}
  //               id={film.id}
  //               key={film.id}
  //               duration={film.duration}
  //               name={film.nameEN}
  //               film={film}
  //             />
  //           );
  //         })
  //       : ''}

  //     <div className='movies-card-list__else'>
  //       <button className='movies-card-list__else-button'>Else</button>
  //     </div>
  //   </section>
  // );
}
