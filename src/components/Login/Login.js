import React from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';

export default function Login({ onLogin }) {
  const {
    values,
    errors,
    isValid,
    handleChange,
    setValues,
    resetForm,
    setIsValid,
    setErrors,
  } = useForm();
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // navigate('/movies');
    onLogin({
      email: values.email,
      password: values.password,
    });
  };
  return (
    <div className='register'>
      <div className='register__logo '></div>
      <h2 className='register__title'>Nice to see you!</h2>
      <form className='register__form' noValidate>
        <div className='register__container'>
          <label className='register__label'>Email</label>
          <input
            type='email'
            id='email-input'
            minLength='2 '
            maxLength='400'
            name='email'
            className='register__input'
            required
            value={values.email || ''}
            onChange={handleChange}
            placeholder='Email'
          />
          {errors.email && (
            <span className='register__input-error'>{errors.email}</span>
          )}
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
            value={values.password || ''}
            onChange={handleChange}
            placeholder='Password'
          />
          {errors.password && (
            <span className='register__input-error'>{errors.password}</span>
          )}
        </div>

        <button
          type='submit'
          className='register__submit'
          onClick={handleSubmit}
          disabled={!isValid}
        >
          Sign in
        </button>
      </form>
      <p className='register__answer'>
        Don't have account? 
        <Link to='/signup' className='register__link'>
           Sign up.
        </Link>
      </p>
    </div>
  );
}
