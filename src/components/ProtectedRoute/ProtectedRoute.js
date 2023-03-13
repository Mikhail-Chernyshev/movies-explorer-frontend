import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ loggedIn, children }) {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);
  if (!loggedIn) {
    return <Navigate to='/' />;
  }
  return children;
}

export default ProtectedRoute;
