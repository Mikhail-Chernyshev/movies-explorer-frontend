import { MOVIES_API } from './MoviesApi';

export const MAIN_API = 'https://api.diplomachernyshev.nomoredomains.club';

export function getUserFilms() {
  return fetch(`${MAIN_API}/movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      //   accept: '*/*',
      authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzhmN2Q3Y2M4OTU2ZmY3MGQyZTZmNDgiLCJpYXQiOjE2NzIyNDk2MzIsImV4cCI6MTY3Mjg1NDQzMn0.3xs-m5jf45pniAPxQydsSVpIkaLjdokhVIunVWmWirQ',
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export function addMovieToUserList({
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
}) {
  return fetch(`${MAIN_API}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //   accept: '*/*',
      authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzhmN2Q3Y2M4OTU2ZmY3MGQyZTZmNDgiLCJpYXQiOjE2NzIyNDk2MzIsImV4cCI6MTY3Mjg1NDQzMn0.3xs-m5jf45pniAPxQydsSVpIkaLjdokhVIunVWmWirQ',
    },
    body: JSON.stringify({
      country: country,
      director: director,
      duration: duration,
      year: year,
      description: description,
      image: MOVIES_API + image.url,
      trailerLink: trailerLink,
      thumbnail: MOVIES_API + image.previewUrl,
      movieId: String(id),
      nameRU: nameRU,
      owner: id,
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
