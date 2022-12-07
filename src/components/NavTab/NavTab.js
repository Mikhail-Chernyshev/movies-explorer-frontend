import React from 'react';
import './NavTab.css';

export default function NavTab() {
  return (
    <div className='navtab'>
      <ul className='navtab__nav'>
        {' '}
        <li className='navtab__item'>Project</li>
        <li className='navtab__item'>Techs</li>
        <li className='navtab__item'>Student</li>
      </ul>
    </div>
  );
}
