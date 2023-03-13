import React from 'react';
import './Login.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';

export default function Login({ onLogin, loggedIn }) {
  const {
    values,
    errors,
    isValid,
    handleChange,
    setValues,
    resetForm,
    setIsValid,
    setErrors,
    newErrors,
  } = useForm();
  const navigate = useNavigate();
  function isEmail(email) {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(email)) {
      setErrors();
      return 'Invalid Email';
    }
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isEmail(values.email) === 'Invalid Email') {
      console.log('wrong');
    }
    onLogin({
      email: values.email,
      password: values.password,
    });
  };
  if (loggedIn) {
    return <Navigate to='/' />;
  }
  return (
    <div className='register'>
      <a href='/' className='register__wrapper-logo'>
        <div className='register__logo '></div>
      </a>
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
