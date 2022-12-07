import React from 'react';
import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h4 className='portfolio__title'>Portfolio</h4>
      <div className='portfolio__item'>
        <h5 className='portfolio__subtitle'>Static site</h5>
        <div className='portfolio__icon'>↗</div>
      </div>
      <div className='portfolio__line'></div>
      <div className='portfolio__item'>
        <h5 className='portfolio__subtitle'>Adaptive site</h5>
        <div className='portfolio__icon'>↗</div>
      </div>
      <div className='portfolio__line'></div>
      <div className='portfolio__item'>
        <h5 className='portfolio__subtitle'>Single page application</h5>
        <div className='portfolio__icon'>↗</div>
      </div>
    </section>
  );
}
