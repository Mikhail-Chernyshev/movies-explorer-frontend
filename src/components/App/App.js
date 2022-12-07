import { useState } from 'react';
import Main from '../Main/Main';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

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
      </Routes>
    </div>
  );
}

export default App;
