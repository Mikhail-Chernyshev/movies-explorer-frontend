import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ loggedIn, children }) {
  if (!loggedIn) {
    return <Navigate to='/' />;
  }
  return children;
}

export default ProtectedRoute;
