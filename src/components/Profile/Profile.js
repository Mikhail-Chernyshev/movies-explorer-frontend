import React from 'react';
import Header from '../Header/Header';
import './Profile.css';

export default function Profile({ loggedIn, openMenu, width, breakpoint }) {
  return (
    <div className='page__wrapper'>
      <Header
        width={width}
        breakpoint={breakpoint}
        openMenu={openMenu}
        loggedIn={loggedIn}
      />
      <div className='main'>
        <section className='profile'>
          <h2 className='profile__title'>Hi, Mikhail!</h2>
          <div className='profile__box'>
            <p className='profile__key-value'>Name</p>
            <p className='profile__key-value'>Mikhail</p>
          </div>
          <div className='profile__line'></div>
          <div className='profile__box'>
            <p className='profile__key-value'>E-mail</p>
            <p className='profile__key-value'>12345@yandex.ru</p>
          </div>
          <button className='profile__button profile__button_edit'>Edit</button>
          <button className='profile__button profile__button_leave'>
            Leave
          </button>
        </section>
      </div>
    </div>
  );
}
