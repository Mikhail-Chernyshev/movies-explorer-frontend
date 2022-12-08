import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

export default function Register({ loggedIn }) {
  return (
    <div className='register'>
      <div className='header__logo register__logo'></div>
      <h2 className='register__title'>Wellcome, user.</h2>
      <form className='register__form' noValidate>
        <div className='register__container'>
          <label className='register__label'>Name</label>
          <input
            type='text'
            id='name-input'
            minLength='2 '
            maxLength='400'
            name='name'
            className='register__input'
            required
            // value={values.email || ''}
            // onChange={handleChange}
            placeholder='Name'
          />
          {/* {errors.email && ( */}
          {/* <span className='register__input-error_active'> */}
          {/* {errors.email} */}
          {/* </span> */}
          {/* )} */}
        </div>
        <div className='register__container'>
          <label className='register__label'>Email</label>

          <input
            type='text'
            id='email-input'
            minLength='2 '
            maxLength='400'
            name='email'
            className='register__input'
            required
            // value={values.email || ''}
            // onChange={handleChange}
            placeholder='Email'
          />
          {/* {errors.email && ( */}
          {/* <span className='register__input-error_active'> */}
          {/* {errors.email} */}
          {/* </span> */}
          {/* )} */}
        </div>
        <div className='register__container'>
          <label className='register__label'>Password</label>

          <input
            type='password'
            id='password-input'
            minLength='2 '
            maxLength='400'
            name='password'
            className='register__input'
            required
            // value={values.email || ''}
            // onChange={handleChange}
            placeholder='Password'
          />
          {/* {errors.email && ( */}
          {/* <span className='register__input-error_active'> */}
          {/* {errors.email} */}
          {/* </span> */}
          {/* )} */}
          <p className='register__label register__error'>Some error</p>
        </div>

        <button
          type='submit'
          className='register__submit'
          //   onClick={handleSubmit}
          //   disabled={!isFormValid}
        >
          Sign up
        </button>
      </form>
      <p className='register__answer'>
        Already have account? 
        <Link to='/signin' className='register__link'>
          Login.
        </Link>
      </p>
    </div>
  );
}
