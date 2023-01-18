import { useState, useEffect } from 'react';
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
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const breakpointTable = 1023;
  const breakpointMobile = 768;
  //пользователь
  const [currentUser, setCurrentUser] = useState({});
  //статус логина
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //like?
  const [isLiked, setIsLiked] = useState(false);
  //устанавливаем ширину для отображения блоков
  const [width, setWidth] = useState(window.innerWidth);
  //открываем меню
  const [isOpenMenu, setisOpenMenu] = useState(false);
  //получаем все фильмы
  const [allFilms, setAllFilms] = useState([]);
  //loading
  const [isLoading, setisLoading] = useState(false);
  //фильмы пользователя
  const [userFilms, setUserFilms] = useState([]);
  //состояние чекбокса
  const [chooseShort, setChooseShort] = useState(
    JSON.parse(localStorage.getItem('chooseShort'))
  );
  //фильмы найденные юзером
  const [searchFilms, setSearchFilms] = useState([]);
  //фильмы в локал сторадж
  const storageFilms = JSON.parse(localStorage.getItem('films'));
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
    localStorage.removeItem('name');
    localStorage.removeItem('films');
    setIsLoggedIn(false);
  };
  //добавляем фильм в хранилище
  const addFilmToStorage = (films) => {
    localStorage.setItem('films', JSON.stringify(films));
  };

  //проверка токена
  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    setIsLoggedIn(true);
    navigate('/movies');
  };
  //переключаем стейт чекбокса
  const handleChooseShortMovies = () => {
    if (chooseShort === false) {
      setChooseShort(true);
      localStorage.setItem('chooseShort', JSON.stringify(true));
    } else {
      setChooseShort(false);
      localStorage.setItem('chooseShort', JSON.stringify(false));
    }
  };
  //ищем фильмы в поиске
  const findMovies = (string) => {
    if (chooseShort === true) {
      const findFilms = allFilms.filter(
        (el) => el.nameEN.includes(string) && el.duration < 41
      );
      setisLoading(true);
      addFilmToStorage(findFilms);
      setSearchFilms(findFilms);
      setUserFilms(findFilms);
      setisLoading(false);
    } else {
      const findFilms = allFilms.filter((el) => el.nameEN.includes(string));
      addFilmToStorage(findFilms);
      setSearchFilms(findFilms);
    }
  };

  //эффекты
  //проверяем токен
  useEffect(() => {
    navigate('/movies');
    handleTokenCheck();
  }, [isLoggedIn]);
  console.log(localStorage);
  //получаем пользователя и все фильмы с сервера и фильмы юзера
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        authApi.getUserInfo(localStorage.getItem('jwt')),
        mainApi.getUserFilms(token),
        moviesApi.getMoviesFromDeatfilm(),
      ])
        .then(([user, userFilms, films]) => {
          setCurrentUser(user);
          setUserFilms(userFilms);
          setAllFilms(films);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);
  //что-то делаем с размером экрана
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  //функции запросы к серверу
  //получаем все фильмы с сервера
  const getAllMovies = () => {
    moviesApi
      .getMoviesFromDeatfilm()
      .then((films) => {
        console.log(films);
        setAllFilms(films);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
        // setAuthEmail(data.email);
        setIsLoggedIn(true);
        navigate('/');
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
  const handleAddToUserList = (
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
  ) => {
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
        setUserFilms([film, ...userFilms]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //короткие фильмы
  // const [shortMovie, setShortMovie] = useState([]);
  //search
  // const handleSetSearch = (string) => {
  //   setSearchString(string);
  // };
  // получаем короткие фильмы
  // const getShortMovies = () => {
  //   setShortMovie(allFilms.filter((el) => el.duration < 41));
  //   setUserFilms(allFilms.filter((el) => el.duration < 41));
  // };
  //меняем состояние стейта редактирования
  // const handleSetChangeUser = () => {
  //   if (isChange === false) {
  //     setIsChange(true);
  //   } else {
  //     setIsChange(false);
  //   }
  // };
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
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Movies
                  isLoading={isLoading}
                  storageFilms={storageFilms}
                  currentPath={currentPath}
                  checkedOrNotCheched={checkedOrNotCheched}
                  isChooseShort={chooseShort}
                  activeChooseShort={handleChooseShortMovies}
                  addToUserList={handleAddToUserList}
                  searchFilms={searchFilms}
                  findMovies={findMovies}
                  films={allFilms}
                  getAllMovies={getAllMovies}
                  openMenu={handleOpenMenu}
                  width={width}
                  breakpointTable={breakpointTable}
                  loggedIn={isLoggedIn}
                  breakpointMobile={breakpointMobile}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <SavedMovies
                  checkedOrNotCheched={checkedOrNotCheched}
                  isChooseShort={chooseShort}
                  activeChooseShort={handleChooseShortMovies}
                  currentPath={currentPath}
                  movies={userFilms}
                  openMenu={handleOpenMenu}
                  findMovies={findMovies}
                  width={width}
                  breakpointTable={breakpointTable}
                  breakpointMobile={breakpointMobile}
                  loggedIn={isLoggedIn}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path='/profile'
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Profile
                  // onChangeUser={handleSetChangeUser}
                  // isChange={isChange}
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
          <Route
            path='/*'
            //  element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />}
            element={<NotFound />}
          />
        </Routes>
        <PopupMenu closeMenu={handleCloseMenu} isOpen={isOpenMenu} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
