import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({
  width,
  breakpointTable,
  films,
  addToUserList,
  searchFilms,
}) {
  if (width > breakpointTable) {
    return (
      <ul className='movies-card-list'>
        {/* {searchFilms */}
        {/* ? searchFilms.map((film) => { */}
        {/* return ( */}
        <MoviesCard
          addToUserList={addToUserList}
          // id={film.id}
          // key={film.id}
          // duration={film.duration}
          // image={film.image.url}
          // name={film.nameEN}
          // film={film}
        />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />

        {/* ); */}
        {/* // }) */}
        {/* : ''} */}
        <div className='movies-card-list__else'>
          <button className='movies-card-list__else-button'>Else</button>
        </div>
      </ul>
    );
  }
  return (
    <section className='movies-card-list'>
      {/* {searchFilms
        ? searchFilms.map((film) => {
            return <MoviesCard key={film.id} name={film.nameEn} />;
          })
        : ''} */}
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <div className='movies-card-list__else'>
        <button className='movies-card-list__else-button'>Else</button>
      </div>
    </section>
  );
}
