import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header({ loggedIn, width, breakpointTable, openMenu }) {
  return (
    <header className='header'>
      <a href='/' className='header__logo'></a>
      {loggedIn ? (
        <Navigation
          openMenu={openMenu}
          width={width}
          breakpointTable={breakpointTable}
        />
      ) : (
        <div className='header__wrapper'>
          <Link to='/signup' className='header__button header__button_register'>
            Register
          </Link>
          <Link to='/signin' className='header__button header__button_login'>
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
