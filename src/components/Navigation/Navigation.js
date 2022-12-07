import React from 'react';
import './Navigation.css';

export default function Navigation() {
  return (
    <div className='navigation'>
      <p className='navigation__item'>Movies</p>
      <p className='navigation__item'>Saved movies</p>
      <p className='navigation__account'>Account</p>
    </div>
  );
}
