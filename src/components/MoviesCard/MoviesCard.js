import React from 'react';
import './MoviesCard.css';
import me from '../../images/IMG_3459.jpg';

export default function MoviesCard() {
  return (
    <li className='movies-card'>
      <h3 className='movies-card__title'>33 words about design</h3>
      <p className='movies-card__time'>1h 47m</p>
      <button type='button' className='movies-card__favourite'></button>
      <img src={me} alt='alt' className='movies-card__image' />
    </li>
  );
}
