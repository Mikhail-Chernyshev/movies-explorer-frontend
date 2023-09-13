import React, { useEffect, useState } from 'react';
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
  const [emailWrong, setemailWrong] = useState('false');

  useEffect(() => {
    let regEmail =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (!regEmail.test(values.email)) {
      setemailWrong(true);
      // newErrors = false;
      console.log('wrong');
      console.log(emailWrong);
    } else {
      setemailWrong(false);
    }
  }, [handleChange]);
  const handleSubmit = (evt) => {
    evt.preventDefault();
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
          {emailWrong === true && (
            <span className='register__input-error'>Некорректный адрес</span>
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
          disabled={!isValid || emailWrong}
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
