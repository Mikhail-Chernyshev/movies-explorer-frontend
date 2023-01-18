import { MOVIES_API } from './MoviesApi';
const MOVIES_URL = 'https://api.nomoreparties.co/';

export const MAIN_API = 'https://api.diplomachernyshev.nomoredomains.club';



export function getUserFilms(token) {
  return fetch(`${MAIN_API}/movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      //   accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export function addMovieToUserList(
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  id,
  nameRU,
  nameEN,
  token
) {
  return fetch(`${MAIN_API}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //   accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      country: country,
      director: director,
      duration: duration,
      year: year,
      description: description,
      image: MOVIES_URL + image,
      trailerLink: trailerLink,
      thumbnail: MOVIES_URL + image,
      // thumbnail: MOVIES_URL,
      movieId: String(id),
      nameRU: nameRU,
      nameEN: nameEN,
    }),
  })
    .then((response) => {
      return response.json;
    })
    .catch((err) => {
      console.log(err);
    });
}
