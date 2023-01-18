import React from 'react';
import './MoviesCard.css';
import me from '../../images/IMG_3459.jpg';

export default function MoviesCard({
  duration,
  name,
  imagee,
  id,
  addToUserList,
  film,
  currentPath,
}) {
  const {
    country,
    director,
    year,
    description,
    trailerLink,
    nameRU,
    nameEN,
    image,
  } = film;
  const { url } = image;
  const token = localStorage.getItem('jwt');
  const MOVIES_URL = 'https://api.nomoreparties.co';
  const linkImg = `${MOVIES_URL}${film.image.url}`;
  function srcImg() {
    if (currentPath === '/movies') {
      return linkImg;
    } else {
      return film.image;
    }
  }
  function onFavouriteClick() {
    addToUserList(
      country,
      director,
      duration,
      year,
      description,
      url,
      trailerLink,
      id,
      nameRU,
      nameEN,
      token
    );
  }
  return (
    <li className='movies-card'>
      <h3 className='movies-card__title'>{name}</h3>

      <p className='movies-card__time'>{duration}</p>

      <button
        onClick={onFavouriteClick}
        type='button'
        className='movies-card__favourite'
      ></button>
      <img src={srcImg()} alt={name} className='movies-card__image' />
    </li>
  );
}
