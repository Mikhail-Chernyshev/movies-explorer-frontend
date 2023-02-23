import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
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
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(evt);
    onRegister({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

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
          {errors.email && (
            <span className='register__input-error'>{errors.email}</span>
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
          disabled={!isValid}
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
