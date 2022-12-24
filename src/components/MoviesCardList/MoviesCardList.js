import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ width, breakpointTable }) {
  if (width > breakpointTable) {
    return (
      <ul className='movies-card-list'>
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
        <MoviesCard />
        <div className='movies-card-list__else'>
          <button className='movies-card-list__else-button'>Else</button>
        </div>
      </ul>
    );
  }
  return (
    <section className='movies-card-list'>
      <MoviesCard />
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
