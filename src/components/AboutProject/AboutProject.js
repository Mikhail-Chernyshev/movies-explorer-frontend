import React from 'react';
import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className='about-project'>
      <h2 className='about-project__title'>About project</h2>
      <div className='about-project__line'></div>
      <div className='about-project__wrapper'>
        <div className='about-project__info'>
          <h3 className='about-project__subtitle'>
            The graduation project included 5 stages
          </h3>
          <p className='about-project__text'>
            Drawing up a plan, working on the backend, layout, adding
            functionality and final improvements.
          </p>
        </div>
        <div className='about-project__info'>
          <h3 className='about-project__subtitle'>
            It took 5 weeks to complete the diploma{' '}
          </h3>
          <p className='about-project__text'>
            Each stage had a soft and hard deadline that had to be met in order
            to successfully defend.
          </p>
        </div>
      </div>
      <div className='about-project__scale'>
        <div className='about-project__scale-wrapper'>
          <div className='about-project__backend'>1 week</div>
          <p className='about-project__backend-text'>Back-end</p>
        </div>
        <div className='about-project__scale-wrapper'>
          <div className='about-project__frontend'>4 week</div>
          <p className='about-project__frontend-text'>Front-end</p>
        </div>
      </div>
    </section>
  );
}
