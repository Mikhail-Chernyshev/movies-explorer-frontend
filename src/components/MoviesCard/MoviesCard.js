import React from 'react';
import './MoviesCard.css';
import me from '../../images/IMG_3459.jpg';

export default function MoviesCard({
  duration,
  name,
  image,
  id,
  addToUserList,
  film,
}) {
  const MOVIES_URL = ' https://api.nomoreparties.co/';
  function onFavouriteClick() {
    console.log(id);
    addToUserList(film);
  }
  return (
    <li className='movies-card'>
      {/* <h3 className='movies-card__title'>{name}</h3> */}
      <h3 className='movies-card__title'>name</h3>

      {/* <p className='movies-card__time'>{duration}</p> */}
      <p className='movies-card__time'>duration</p>

      <button
        onClick={onFavouriteClick}
        type='button'
        className='movies-card__favourite'
      ></button>
      <img
        // src={`${MOVIES_URL}${image}`}

        src={me}
        alt='alt'
        className='movies-card__image'
      />
    </li>
  );
}
