import React, { useEffect, useState } from 'react';
import './Register.css';
import { Link, Navigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';

export default function Register({ loggedIn, onRegister }) {
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
    console.log(evt);
    onRegister({
      name: values.name,
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
        <div className='register__logo'></div>
      </a>
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
            placeholder='Name'
            value={values.name || ''}
            onChange={handleChange}
          />
          {errors.name && (
            <span className='register__input-error'>{errors.name}</span>
          )}
        </div>
        <div className='register__container'>
          <label className='register__label'>Email</label>

          <input
            id='email-input'
            minLength='2 '
            maxLength='400'
            name='email'
            className='register__input'
            required
            value={values.email || ''}
            onChange={handleChange}
            placeholder='Email'
            type='email'
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
            minLength='8'
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
