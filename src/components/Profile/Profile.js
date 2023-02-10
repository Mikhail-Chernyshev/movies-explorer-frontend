import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Profile.css';
import useForm from '../../hooks/useForm';

export default function Profile({
  loggedIn,
  openMenu,
  width,
  breakpointTable,
  loggedOut,
  user,
  onEditUser,
}) {
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
  const token = localStorage.getItem('jwt');
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(evt);
    onEditUser({ name: values.name, email: values.email, token });
  };
  React.useEffect(() => {
    setValues({ name: user.name, email: user.email });
    setErrors({});
    setIsValid(true);
  }, []);

  React.useEffect(() => {
    resetForm();
    setValues({ name: user.name, email: user.email });
    setIsValid(true);
  }, [user]);
  function handleLeave() {
    loggedOut();
  }
  return (
    <div className='page__wrapper'>
      <Header
        width={width}
        breakpointTable={breakpointTable}
        openMenu={openMenu}
        loggedIn={loggedIn}
      />
      <div className='main'>
        <section className='profile'>
          <form onSubmit={handleSubmit} className='register__form' noValidate>
            <h2 className='profile__title'>Hi, {user.name}!</h2>
            <div className='profile__box'>
              <p className='profile__key-value'>Name</p>
              <input
                className='profile__key-value'
                type='text'
                id='name-input'
                minLength='2 '
                maxLength='30'
                name='name'
                required
                value={values.name || ''}
                onChange={handleChange}
                placeholder='Введите имя'
              ></input>
            </div>
            <div className='profile__line'></div>
            <div className='profile__box'>
              <p className='profile__key-value'>E-mail</p>
              <input
                className='profile__key-value'
                type='text'
                id='email-input'
                minLength='2 '
                maxLength='100'
                name='email'
                required
                value={values.email || ''}
                onChange={handleChange}
                placeholder='Введите почту'
              ></input>
            </div>
            <button
              disabled={
                !isValid ||
                (values.name === user.name && values.email === user.email)
              }
              type='submit'
              className='profile__button profile__button_edit'
            >
              Edit
            </button>
          </form>

          <Link
            to='/signin'
            onClick={handleLeave}
            className='profile__button profile__button_leave'
          >
            Leave
          </Link>
        </section>
      </div>
    </div>
  );
}
