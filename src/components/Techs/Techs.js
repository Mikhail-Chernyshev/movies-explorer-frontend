import React from 'react';
import './Techs.css';

export default function Techs() {
  return (
    <section className='techs'>
      <h2 className='techs__title'>Technologies</h2>
      <div className='techs__line'></div>
      <h3 className='techs__subtitle'>7 technologies</h3>
      <p className='techs__description'>
        During the web development course, we mastered the technologies that we
        applied in the graduation project.
      </p>
      <ul className='techs__list'>
        <li className='techs__tech-item'>HTML</li>
        <li className='techs__tech-item'>CSS</li>
        <li className='techs__tech-item'>JS</li>
        <li className='techs__tech-item'>React</li>
        <li className='techs__tech-item'>Git</li>
        <li className='techs__tech-item'>Express.js</li>
        <li className='techs__tech-item'>mongoDB</li>
      </ul>
    </section>
  );
}
