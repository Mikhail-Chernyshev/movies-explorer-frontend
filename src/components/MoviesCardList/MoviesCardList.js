import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({
  addToUserList,
  storageFilms,
  currentPath,
  savedFilms,
  renderedFilms,
  showMoreFilms,
  onDeleteMovie,
  setUserFilms,
  userFilms,
  showUserFilms,
}) {
  return (
    <ul className='movies-card-list'>
      {currentPath === '/movies' && storageFilms
        ? storageFilms
            .map((film) => {
              return (
                <MoviesCard
                  showUserFilms={showUserFilms}
                  setUserFilms={setUserFilms}
                  userFilms={userFilms}
                  onDeleteMovie={onDeleteMovie}
                  savedFilms={savedFilms}
                  currentPath={currentPath}
                  addToUserList={addToUserList}
                  film={film}
                  id={film.id}
                  key={currentPath === '/movies' ? film.id : film._id}
                  duration={film.duration}
                  name={film.nameEN}
                />
              );
            })
            .slice(0, renderedFilms)
        : currentPath === '/saved-movies' && savedFilms
        ? savedFilms.map((film) => {
            return (
              <MoviesCard
                setUserFilms={setUserFilms}
                userFilms={userFilms}
                savedFilms={savedFilms}
                onDeleteMovie={onDeleteMovie}
                currentPath={currentPath}
                addToUserList={addToUserList}
                id={film.id}
                key={currentPath === '/movies' ? film.id : film._id}
                duration={film.duration}
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
}
