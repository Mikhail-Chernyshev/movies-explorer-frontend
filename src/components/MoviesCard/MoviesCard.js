import React from 'react';
import './MoviesCard.css';
import me from '../../images/IMG_3459.jpg';
import { TfiClose } from 'react-icons/tfi';

export default function MoviesCard({
  duration,
  name,
  imagee,
  id,
  addToUserList,
  film,
  currentPath,
  onDeleteMovie,
  savedFilms,
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
  //   const cardImage ={
  //     background: 'url(' + TfiClose + ') no-repeat center top/cover'
  // };
  console.log(savedFilms);
  const isLiked = savedFilms.some((item) => Number(item.movieId) === film.id);
  console.log(isLiked);
  console.log(film);
  const token = localStorage.getItem('jwt');
  function onDeleteMovieFromUser() {
    onDeleteMovie(token, film);
  }
  const { url } = image;
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
      {currentPath === '/movies' ? (
        <button
          onClick={isLiked === true ? onDeleteMovieFromUser : onFavouriteClick}
          type='button'
          className={`movies-card__add ${
            isLiked === true ? 'movies-card__add_active' : ''
          }`}
          // onClick={onFavouriteClick}
          // className='movies-card__add'
        ></button>
      ) : (
        ''
      )}
      {currentPath === '/saved-movies' ? (
        <button
          // style={{ backgroundImage: `url(${TfiClose})` }}
          // style={{background: `url(${SpeechBubble1})`}}
          // style={cardImage}
          type='button'
          className='movies-card__favourite'
          onClick={onDeleteMovieFromUser}
        >
          x
        </button>
      ) : (
        ''
      )}

      <img src={srcImg()} alt={name} className='movies-card__image' />
    </li>
  );
}
