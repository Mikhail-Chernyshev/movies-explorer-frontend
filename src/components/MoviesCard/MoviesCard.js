import React, { useEffect } from 'react';
import './MoviesCard.css';
import me from '../../images/IMG_3459.jpg';

export default function MoviesCard({
  duration,
  name,
  id,
  addToUserList,
  film,
  currentPath,
  onDeleteMovie,
  savedFilms,
  showUserFilms,
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
  console.log(savedFilms);
  const isLiked = savedFilms
    ? savedFilms.some((item) => Number(item.movieId) === film.id)
    : showUserFilms.some((item) => Number(item.movieId) === film.id);
  const token = localStorage.getItem('jwt');
  function onDeleteMovieFromUser() {
    onDeleteMovie(token, film);
  }
  const { url } = currentPath === '/movies' ? image : '';
  const MOVIES_URL = 'https://api.nomoreparties.co';
  const linkImg =
    currentPath === '/movies' ? `${MOVIES_URL}${film.image.url}` : '';

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
      {currentPath === '/movies' ? (
        <button
          onClick={isLiked === true ? onDeleteMovieFromUser : onFavouriteClick}
          type='button'
          className={`movies-card__add ${
            isLiked === true ? 'movies-card__add_active' : ''
          }`}
        ></button>
      ) : (
        ''
      )}
      {currentPath === '/saved-movies' ? (
        <button
          type='button'
          className='movies-card__favourite'
          onClick={onDeleteMovieFromUser}
        ></button>
      ) : (
        ''
      )}
      <a href={film.trailerLink} target='_blanc' className=''>
        <img src={srcImg()} alt={name} className='movies-card__image' />
      </a>
    </li>
  );
}
