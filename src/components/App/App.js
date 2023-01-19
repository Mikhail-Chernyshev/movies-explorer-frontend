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
  //массивы фильмов
  //получаем все фильмы
  const [allFilms, setAllFilms] = useState([]);
  //фильмы пользователя
  const [userFilms, setUserFilms] = useState([]);
  //фильмы найденные юзером - их передаем в сторадж
  const [searchFilms, setSearchFilms] = useState([]);
  //фильмы в локал сторадж
  const storageFilms = JSON.parse(localStorage.getItem('films'));
  //состояние чекбокса
  console.log(localStorage);
  console.log(searchFilms);
  console.log(storageFilms);
  console.log(userFilms);
  const [chooseShort, setChooseShort] = useState(localStorage.chooseShort);
  console.log(chooseShort);
  //поисковой запрос
  const [searchValue, setSearchValue] = useState(localStorage.search);
  //пользователь
  const [currentUser, setCurrentUser] = useState({});
  //статус логина
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //movies on page
  const [renderedFilms, setRenderedFilms] = useState(3);
  //like?
  const [isLiked, setIsLiked] = useState(false);
  //устанавливаем ширину для отображения блоков
  const [width, setWidth] = useState(window.innerWidth);
  //открываем меню
  const [isOpenMenu, setisOpenMenu] = useState(false);

  //loading преолоадер
  const [isLoading, setisLoading] = useState(false);

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
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.clear();
    setAllFilms([]);
    setSearchFilms([]);
    setUserFilms([]);
    setSearchValue('');
    navigate('/');
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
  //показываем больше фильмов
  function handleShowMoreFilms() {
    setRenderedFilms(renderedFilms + 3);
  }

  //переключаем стейт чекбокса
  const handleChooseShortMovies = () => {
    if (chooseShort === 'false') {
      setChooseShort(true);
      localStorage.setItem('chooseShort', JSON.stringify(true));
      console.log(localStorage.chooseShort);
    } else {
      setChooseShort(false);
      localStorage.setItem('chooseShort', JSON.stringify(false));
    }
  };
  //ищем фильмы в поиске
  const findMovies = (string) => {
    if (currentPath === '/saved-movies') {
      setUserFilms(userFilms.filter((el) => el.nameEN.includes(string)));
    } else if (chooseShort === true) {
      const findFilms = allFilms.filter(
        (el) => el.nameEN.includes(string) && el.duration < 41
      );
      setisLoading(true);
      addFilmToStorage(findFilms);
      setSearchFilms(findFilms);
      setTimeout(setisLoading(false), 1000);
    } else {
      const findFilms = allFilms.filter((el) => el.nameEN.includes(string));
      setisLoading(true);
      addFilmToStorage(findFilms);
      setSearchFilms(findFilms);
      setisLoading(false);
    }
  };
  useEffect(() => {
    if (allFilms.length > 0) {
      if (currentPath === '/movies') {
        const moviesStorage = findMovies(allFilms, searchValue, chooseShort);
        localStorage.setItem('searchedFilms', JSON.stringify(moviesStorage));
        localStorage.setItem('search', searchValue);
        localStorage.setItem('chooseShort', chooseShort);

        setSearchFilms(moviesStorage);
      } else {
        const moviesStorage = findMovies(allFilms, searchValue, chooseShort);
        localStorage.setItem('searchedFilms', JSON.stringify(moviesStorage));
        localStorage.setItem('chooseShort', chooseShort);

        setSearchFilms(moviesStorage);
      }
    }
  }, [currentPath]);

  //эффекты
  //проверяем токен
  useEffect(() => {
    handleTokenCheck();
  }, [isLoggedIn]);
  //получаем пользователя и все фильмы с сервера и фильмы юзера
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        authApi.getUserInfo(token),
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
        setUserFilms([...userFilms, film]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const isLiked = (data) => {
  //   return savedMovies.some(i => i.movieId === data.id && i.owner === currentUser?._id);
  //   // return savedMovies.some(i => i.movieId === data.id && i.movieId === data._id && i.owner === currentUser._id)
  // }

  // useEffect(() => {
  //   if (width >= 1280) {
  //     setNumber(3);
  //     setRenderedMovies(12);
  //   } else if (width >= 768 && width <= 1279) {
  //     setNumber(2);
  //     setRenderedMovies(8);
  //   } else if (width <= 600) {
  //     setNumber(1);
  //     setRenderedMovies(5);
  //   }
  // }, [width])

  //короткие фильмы
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
                  showMoreFilms={handleShowMoreFilms}
                  renderedFilms={renderedFilms}
                  setSearchValue={setSearchValue}
                  setChooseShort={setChooseShort}
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
