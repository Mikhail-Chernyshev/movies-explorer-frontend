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
        <ul className='popup-menu__nav'>
          <Link onClick={closeMenu} to='/' className='popup-menu__nav-item'>
            Main
          </Link>
          <Link
            onClick={closeMenu}
            to='/movies'
            className='popup-menu__nav-item'
          >
            Movies
          </Link>
          <Link
            onClick={closeMenu}
            to='/saved-movies'
            className=' popup-menu__nav-item'
          >
            Saved movies
          </Link>
          <Link
            onClick={closeMenu}
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
