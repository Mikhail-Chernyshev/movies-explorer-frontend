import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className='register'>
      <div className='register__logo '></div>
      <h2 className='register__title'>Nice to see you!</h2>
      <form className='register__form' noValidate>
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
          {/* <span className='register__input-error'> */}
          {/* {errors.email} */}
          {/* </span> */}
          {/* )} */}
        </div>
        <div className='register__container'>
          <label className='register__label'>Password</label>

          <input
            type='text'
            id='password-input'
            minLength='2 '
            maxLength='400'
            name='password'
            className='register__input'
            required
            // value={values.email || ''}
            // onChange={handleChange}
            placeholder='Email'
          />
          {/* {errors.email && ( */}
          {/* <span className='register__input-error'> */}
          {/* {errors.email} */}
          {/* </span> */}
          {/* )} */}
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
