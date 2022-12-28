import React from 'react';
import './AboutMe.css';
import me from '../../images/IMG_3459.jpg';

export default function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__title'>Student</h2>
      <div className='about-me__line'></div>
      <div className='about-me__wrapper'>
        <div className='about-me__column'>
          <h3 className='about-me__subtitle'>Mikhail</h3>
          <h4 className='about-me__rank'>Front-end developer, 29 years old</h4>
          <p className='about-me__text'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a href='1' className='about-me__link'>
            Github
          </a>
        </div>
        <img src={me} className='about-me__photo' alt='me'></img>
      </div>
    </section>
  );
}
