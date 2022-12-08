import { useState } from 'react';
import Main from '../Main/Main';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Main loggedIn={isLoggedIn} />}></Route>
      </Routes>
      <Routes>
        <Route
          path='/movies'
          element={<Movies loggedIn={isLoggedIn} />}
        ></Route>
      </Routes>
      <Routes>
        <Route
          path='/saved-movies'
          element={<SavedMovies loggedIn={isLoggedIn} />}
        ></Route>
        <Route
          path='/profile'
          element={<Profile loggedIn={isLoggedIn} />}
        ></Route>
        <Route
          path='/signup'
          element={<Register loggedIn={isLoggedIn} />}
        ></Route>
        <Route path='/signin' element={<Login loggedIn={isLoggedIn} />}></Route>
        <Route
          path='/*'
          // element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />}
          element={<NotFound />}
        />
      </Routes>
    </div>
  );
}

export default App;
