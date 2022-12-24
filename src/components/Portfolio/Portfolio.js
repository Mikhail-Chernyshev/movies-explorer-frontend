import React from 'react';
import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h4 className='portfolio__title'>Portfolio</h4>
      <ul className='portfolio__items'>
        <li className='portfolio__item'>
          <a
            href='https://mikhail-chernyshev.github.io/how-to-learn/'
            className='portfolio__subtitle'
          >
            Static site
          </a>
          <div className='portfolio__icon'>↗</div>
        </li>
        <div className='portfolio__line'></div>

        <li className='portfolio__item'>
          <a
            href='https://mikhail-chernyshev.github.io/russian-travel/'
            className='portfolio__subtitle'
          >
            Adaptive site
          </a>
          <div className='portfolio__icon'>↗</div>
        </li>
        <div className='portfolio__line'></div>
        <li className='portfolio__item'>
          <a
            href='https://mikhail-chernyshev.github.io/'
            className='portfolio__subtitle'
          >
            Single page application
          </a>
          <div className='portfolio__icon'>↗</div>
        </li>
      </ul>
    </section>
  );
}
