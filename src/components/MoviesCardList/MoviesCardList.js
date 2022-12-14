import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ width, breakpoint }) {
  // const [width, setWidth] = useState(window.innerWidth);
  // const breakpoint = 1024;
  // useEffect(() => {
  //   const handleResizeWindow = () => setWidth(window.innerWidth);
  //   // subscribe to window resize event "onComponentDidMount"
  //   window.addEventListener('resize', handleResizeWindow);
  //   return () => {
  //     // unsubscribe "onComponentDestroy"
  //     window.removeEventListener('resize', handleResizeWindow);
  //   };
  // }, []);
  if (width > breakpoint) {
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
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </section>
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
