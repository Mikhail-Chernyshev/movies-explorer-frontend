import React from 'react';
import './Footer.css';

export default function Footer({ breakpointMobile, width }) {
  if (width > breakpointMobile) {
    return (
      <footer className='footer'>
        <h5 className='footer__title'>Project Yandex.Practicum х BeatFilm.</h5>
        <div className='footer__line'></div>
        <div className='footer__wrapper'>
          <p className='footer__year'>© 2022</p>
          <div className='footer__companys'>
            <a href='d' className='footer__company'>
              Yandex.Practicum
            </a>
            <a href='2' className='footer__company'>
              Github
            </a>
          </div>
        </div>
      </footer>
    );
  }
  return (
    <footer className='footer'>
      <h5 className='footer__title'>Project Yandex.Practicum х BeatFilm.</h5>
      <div className='footer__line'></div>
      <div className='footer__wrapper'>
        {/* <div className='footer__companys'> */}
        <a href='d' className='footer__company'>
          Yandex.Practicum
        </a>
        <a href='2' className='footer__company'>
          Github
        </a>
        <p className='footer__year'>© 2022</p>

        {/* </div> */}
      </div>
    </footer>
  );
}
