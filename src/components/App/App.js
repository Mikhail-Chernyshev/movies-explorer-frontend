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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isOpenMenu, setisOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setisOpenMenu(true);
  };
  const handleCloseMenu = () => {
    setisOpenMenu(false);
  };
  const breakpointTable = 770;
  const breakpointMobile = 320;
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);
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
          element={<Register loggedIn={isLoggedIn} />}
        ></Route>
        <Route path='/signin' element={<Login loggedIn={isLoggedIn} />}></Route>
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
