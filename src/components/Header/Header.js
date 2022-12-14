import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header({ loggedIn, width, breakpoint, openMenu }) {
  return (
    <header className='header'>
      <div className='header__logo'></div>
      {!loggedIn ? (
        <Navigation openMenu={openMenu} width={width} breakpoint={breakpoint} />
      ) : (
        <div className='header__wrapper'>
          <button className='header__button header__button_register'>
            Register
          </button>
          <button className='header__button header__button_login'>Login</button>
        </div>
      )}
    </header>
  );
}
