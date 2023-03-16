import { useState, useEffect, useContext } from 'react';
import Main from '../Main/Main';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import PopupMenu from '../PopupMenu/PopupMenu';
import * as moviesApi from '../../utils/api/MoviesApi';
import * as mainApi from '../../utils/api/MainApi';
import * as authApi from '../../utils/api/AuthUpi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  console.log(localStorage);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const breakpointTable = 1023;
  const breakpointMobile = 768;
  //получаем все фильмы
  const [allFilms, setAllFilms] = useState([]);
  //фильмы пользователя
  const [userFilms, setUserFilms] = useState([]);
  //show
  const [showUserFilms, setShowUserFilms] = useState([]);
  //фильмы найденные юзером - их передаем в сторадж
  const [searchFilms, setSearchFilms] = useState([]);
  //фильмы в локал сторадж
  const storageFilms = JSON.parse(localStorage.getItem('films'));
  //поисковой запрос
  const [searchValue, setSearchValue] = useState(localStorage.search);
  //пользователь
  const [currentUser, setCurrentUser] = useState({});
  //статус логина
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);
  //movies on page
  const [renderedFilms, setRenderedFilms] = useState(3);
  //устанавливаем ширину для отображения блоков
  const [width, setWidth] = useState(window.innerWidth);
  //открываем меню
  const [isOpenMenu, setisOpenMenu] = useState(false);
  //loading преолоадер
  const [isLoading, setisLoading] = useState(false);
  //error
  const [error, setError] = useState('');
  const [errorRequest, seterrorRequest] = useState(false);
  //токен
  const token = localStorage.getItem('jwt');
  //функции для стейтов
  //устанавливаем состояние чекбокса
  const checkedOrNotCheched = () => {
    if (localStorage.chooseShort === 'true') {
      return true;
    } else {
      return false;
    }
  };
  //открываем меню
  const handleOpenMenu = () => {
    setisOpenMenu(true);
  };
  //закрываем меню
  const handleCloseMenu = () => {
    setisOpenMenu(false);
  };
  //выход
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('chooseShort');
    localStorage.removeItem('checkbox');
    localStorage.removeItem('search');
    localStorage.removeItem('name');
    localStorage.removeItem('searchedFilms');
    localStorage.removeItem('loggedIn');
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.clear();
    setAllFilms([]);
    setSearchFilms([]);
    setUserFilms([]);
    setSearchValue('');
  };
  //добавляем фильм в хранилище
  const addFilmToStorage = (films) => {
    localStorage.setItem('films', JSON.stringify(films));
  };

  //проверка токена
  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      setIsLoggedIn(false);
      // return;
    } else {
      localStorage.setItem('loggedIn', true);
      setIsLoggedIn(true);
    }
  };
  //показываем больше фильмов
  function handleShowMoreFilms() {
    setRenderedFilms(renderedFilms + 3);
  }

  //переключаем стейт чекбокса
  const handleChooseShortMovies = () => {
    if (localStorage.chooseShort === 'false') {
      // setChooseShort(true);
      localStorage.setItem('chooseShort', JSON.stringify(true));
    } else {
      // setChooseShort(false);
      localStorage.setItem('chooseShort', JSON.stringify(false));
    }
  };
  //ищем фильмы в поиске
  const findMovies = (string) => {
    setisLoading(true);
    if (localStorage.chooseShort === 'true') {
      const findFilms = allFilms.filter(
        (el) =>
          (el.nameEN.toLowerCase().includes(string.toLowerCase()) &&
            el.duration < 41) ||
          (el.nameRU.toLowerCase().includes(string.toLowerCase()) &&
            el.duration < 41)
      );
      addFilmToStorage(findFilms);
      setSearchFilms(findFilms);
      finishSearch();
    } else if (string === '') {
      setError('Empty request');
      finishSearch();
      localStorage.setItem('films', JSON.stringify([]));

      setSearchFilms([]);
    } else {
      const findFilms = allFilms.filter(
        (el) =>
          el.nameEN.toLowerCase().includes(string.toLowerCase()) ||
          el.nameRU.toLowerCase().includes(string.toLowerCase())
      );
      addFilmToStorage(findFilms);
      setSearchFilms(findFilms);
      finishSearch();
    }
  };

  const findMoviesUser = (string) => {
    if (localStorage.chooseShort === 'true') {
      setShowUserFilms(
        userFilms.filter((el) => el.nameEN.includes(string) && el.duration < 41)
      );
    } else {
      setShowUserFilms(userFilms.filter((el) => el.nameEN.includes(string)));
    }
  };
  //эффекты
  //проверяем токен
  useEffect(() => {
    handleTokenCheck();
    if (isLoggedIn) {
    }
    localStorage.setItem('chooseShort', false);
  }, [isLoggedIn]);

  // получаем пользователя и все фильмы с сервера и фильмы юзера
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        authApi.getUserInfo(token),
        mainApi.getUserFilms(token),
        moviesApi.getMoviesFromDeatfilm(),
      ])
        .then(([user, userFilms, films]) => {
          setCurrentUser(user);
          setShowUserFilms(userFilms);
          setUserFilms(userFilms);
          setAllFilms(films);
        })
        .catch((err) => {
          seterrorRequest(true);
          console.log(err);
        })
        .finally(() => {});
    }
  }, [isLoggedIn]);

  function finishSearch() {
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
  }
  //размер экрана
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  //регистрация пользователя
  const handleRegister = (data) => {
    authApi
      .register(data)
      .then((res) => {
        navigate('/signin');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //авторизация пользователя
  const handleLogin = (data) => {
    authApi
      .login(data)
      .then((res) => {
        if (res.token) localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //редактируем пользователя
  const handleEditUser = (data) => {
    authApi
      .editUserInfo(data)
      .then((user) => setCurrentUser(user))
      .catch((err) => {
        console.log(err);
      });
  };
  //добавить фильм в список пользователя
  function handleAddToUserList(
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
    mainApi
      .addMovieToUserList(
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
      )
      .then((film) => {
        newUserListPlus(film);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function newUserListPlus(item) {
    setShowUserFilms([...userFilms, item]);
  }
  function newUserList(id) {
    const updatedUserMovies = userFilms.filter((data) => data._id !== id);
    setShowUserFilms(updatedUserMovies);
  }
  function handleDeleteMovie(token, movie) {
    let idishechka;
    if (currentPath === '/movies') {
      let deleteMovie = userFilms.filter(
        (film) => Number(film.movieId) === movie.id
      );
      idishechka = deleteMovie[0]._id;
    } else {
      idishechka = movie._id;
    }
    mainApi
      .deleteMovie(token, idishechka)
      .then(() => {
        newUserList(idishechka);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route
            path='/'
            element={
              <Main
                openMenu={handleOpenMenu}
                width={width}
                breakpointTable={breakpointTable}
                loggedIn={isLoggedIn}
                breakpointMobile={breakpointMobile}
              />
            }
          ></Route>
          <Route
            path='/movies'
            element={
              <ProtectedRoute
                children={
                  <Movies
                    showUserFilms={showUserFilms}
                    errorRequest={errorRequest}
                    error={error}
                    onDeleteMovie={handleDeleteMovie}
                    showMoreFilms={handleShowMoreFilms}
                    renderedFilms={renderedFilms}
                    isLoading={isLoading}
                    storageFilms={storageFilms}
                    currentPath={currentPath}
                    activeChooseShort={handleChooseShortMovies}
                    addToUserList={handleAddToUserList}
                    findMovies={findMovies}
                    openMenu={handleOpenMenu}
                    width={width}
                    breakpointTable={breakpointTable}
                    loggedIn={isLoggedIn}
                    breakpointMobile={breakpointMobile}
                    savedFilms={userFilms}
                  />
                }
                loggedIn={isLoggedIn}
              ></ProtectedRoute>
            }
          ></Route>
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <SavedMovies
                  findMoviesUser={findMoviesUser}
                  onDeleteMovie={handleDeleteMovie}
                  checkedOrNotCheched={checkedOrNotCheched}
                  activeChooseShort={handleChooseShortMovies}
                  currentPath={currentPath}
                  movies={showUserFilms}
                  openMenu={handleOpenMenu}
                  findMovies={findMovies}
                  width={width}
                  breakpointTable={breakpointTable}
                  breakpointMobile={breakpointMobile}
                  loggedIn={isLoggedIn}
                  setUserFilms={setUserFilms}
                  userFilms={userFilms}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path='/profile'
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Profile
                  user={currentUser}
                  loggedOut={handleLogout}
                  width={width}
                  breakpointTable={breakpointTable}
                  openMenu={handleOpenMenu}
                  loggedIn={isLoggedIn}
                  onEditUser={handleEditUser}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path='/signup'
            element={
              <Register onRegister={handleRegister} loggedIn={isLoggedIn} />
            }
          ></Route>
          <Route
            path='/signin'
            element={<Login onLogin={handleLogin} loggedIn={isLoggedIn} />}
          ></Route>
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <PopupMenu closeMenu={handleCloseMenu} isOpen={isOpenMenu} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
