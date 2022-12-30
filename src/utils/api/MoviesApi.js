export const MOVIES_API = 'https://api.nomoreparties.co/beatfilm-movies';

export function getMoviesFromDeatfilm() {
  return fetch(MOVIES_API, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      accept: '*/*',
     },
  }).then((response) => {
    return response.json();
  });
}
