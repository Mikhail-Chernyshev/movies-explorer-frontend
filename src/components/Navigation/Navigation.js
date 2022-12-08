import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  return (
    <div className='navigation'>
      <Link to='/movies' className='navigation__item'>Movies</Link>
      <Link to='/saved-movies' className='navigation__item'>Saved movies</Link>
      <Link to='/profile' className='navigation__account'>Account</Link>
    </div>
  );
}
