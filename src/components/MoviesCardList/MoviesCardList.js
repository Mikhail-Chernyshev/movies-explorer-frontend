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
}) {
  console.log(currentPath);

  if (width > breakpointTable) {
    return (
      <ul className='movies-card-list'>
        {storageFilms === null
          ? searchFilms.map((film) => {
              return (
                <MoviesCard
                  currentPath={currentPath}
                  addToUserList={addToUserList}
                  id={film.id}
                  key={film.id}
                  duration={film.duration}
                  name={film.nameEN}
                  film={film}
                />
              );
            })
          : storageFilms.map((film) => {
              return (
                <MoviesCard
                  currentPath={currentPath}
                  addToUserList={addToUserList}
                  id={film.id}
                  key={film.id}
                  duration={film.duration}
                  imagee={film.image}
                  name={film.nameEN}
                  film={film}
                />
              );
            })}

        <div className='movies-card-list__else'>
          <button className='movies-card-list__else-button'>Else</button>
        </div>
      </ul>
    );
  }
  return (
    <section className='movies-card-list'>
      {searchFilms
        ? searchFilms.map((film) => {
            return (
              <MoviesCard
                addToUserList={addToUserList}
                id={film.id}
                key={film.id}
                duration={film.duration}
                name={film.nameEN}
                film={film}
              />
            );
          })
        : ''}

      <div className='movies-card-list__else'>
        <button className='movies-card-list__else-button'>Else</button>
      </div>
    </section>
  );
}
