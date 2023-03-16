import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function ProtectedRoute({ children }) {
  const value = useContext(CurrentUserContext);
  console.log(value);
  return !localStorage.loggedIn ? <Navigate to='/' /> : children;
}

export default ProtectedRoute;
