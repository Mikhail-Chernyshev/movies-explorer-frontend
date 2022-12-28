import React from 'react';
import { Link } from 'react-router-dom';
import './PopupMenu.css';

export default function PopupMenu({ closeMenu, isOpen }) {
  return (
    <div className={`popup-menu ${isOpen && 'popup-menu_opened'}`}>
      <div className='popup-menu__content'>
        <button
          className='popup-menu__close'
          type='button'
          onClick={closeMenu}
        ></button>
        <ul>
          <Link to='/' className='popup-menu__nav-item'>
            Main
          </Link>
          <Link to='/movies' className='popup-menu__nav-item'>
            Movies
          </Link>
          <Link
            to='/saved-movies'
            className=' popup-menu__nav-item'
          >
            Saved movies
          </Link>
          <Link
            to='/profile'
            className=' popup-menu__nav-item'
          >
            Account
          </Link>
        </ul>
      </div>
    </div>
  );
}
