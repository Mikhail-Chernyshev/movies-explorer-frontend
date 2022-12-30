import { useState, useEffect } from 'react';
import Main from '../Main/Main';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
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

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [isOpenMenu, setisOpenMenu] = useState(false);
  const [allFilms, setAllFilms] = useState([]);
  const [userFilms, setUserFilms] = useState([]);
  // const [searchString, setSearchString] = useState('second');
  const [searchFilms, setSearchFilms] = useState([]);

  const handleOpenMenu = () => {
    setisOpenMenu(true);
  };
  const handleCloseMenu = () => {
    setisOpenMenu(false);
  };
  // const handleSetSearch = (string) => {
  //   setSearchString(string);
  // };
  const breakpointTable = 1023;
  const breakpointMobile = 768;
  // useEffect(() => {
  //   handleTokenCheck();
  // }, [isLoggedIn]);
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);
  // useEffect(() => {
  //   moviesApi
  //   .getMoviesFromDeatfilm()
  //   .then((films) => {
  //     console.log(films);
  //     setAllFilms(films)
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }, [isLoggedIn, allFilms])
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
  const getUserMovies = () => {
    mainApi
      .getUserFilms()
      .then((films) => {
        console.log(films);
        setUserFilms(films);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
  };
  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    setIsLoggedIn(true);
    navigate('/');
  };

  const handleAddToUserList = (id) => {
    mainApi
      .addMovieToUserList(id)
      .then((film) => {
        setUserFilms([film, ...userFilms]);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const findMovies = (string) => {
    const findFilms = allFilms.filter((el) => el.nameEN.includes(string));
    console.log(findFilms);
    setSearchFilms(findFilms);
  };
  return (
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
            <Movies
              addToUserList={handleAddToUserList}
              searchFilms={searchFilms}
              findMovies={findMovies}
              // setSearch={handleSetSearch}
              films={allFilms}
              getAllMovies={getAllMovies}
              openMenu={handleOpenMenu}
              width={width}
              breakpointTable={breakpointTable}
              loggedIn={isLoggedIn}
              breakpointMobile={breakpointMobile}
            />
          }
        ></Route>
        <Route
          path='/saved-movies'
          element={
            <SavedMovies
              openMenu={handleOpenMenu}
              width={width}
              breakpointTable={breakpointTable}
              breakpointMobile={breakpointMobile}
              loggedIn={isLoggedIn}
            />
          }
        ></Route>
        <Route
          path='/profile'
          element={
            <Profile
              width={width}
              breakpointTable={breakpointTable}
              openMenu={handleOpenMenu}
              loggedIn={isLoggedIn}
            />
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
  );
}

export default App;
