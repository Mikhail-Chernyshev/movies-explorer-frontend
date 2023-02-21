import React from "react";
import { Link, Navigate } from "react-router-dom";

function ProtectedRoute({ loggedIn, children }) {
  if (!loggedIn) {
    return <Link to="/" />;
  }

  return children;
}

export default ProtectedRoute;
