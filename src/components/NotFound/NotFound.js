import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

export default function NotFound() {
  return (
    <div className='not-found'>
      <h2 className='not-found__error-code'>404</h2>
      <p className='not-found__error-text'>Page not found</p>
      <Link to='/' className='not-found__back'>
        Back
      </Link>
    </div>
  );
}
