import React from 'react';
import './SearchForm.css';
import useForm from '../../hooks/useForm';

export default function SearchForm({
  findMovies,
  activeChooseShort,
  currentPath,
  findMoviesUser,
  errorr,
  storageFilms,
  isLoading,
  errorRequest,
}) {
  const checked =
    currentPath === '/movies' || localStorage.getItem('chooseShort')
      ? JSON.parse(localStorage.chooseShort)
      : '';
  const { values, handleChange, errors, setValues, setErrors, isValid } =
    useForm();
  function handleCheckbox() {
    activeChooseShort();
  }
  React.useEffect(() => {
    if (currentPath === '/movies') {
      setValues({ name: localStorage.getItem('search') });
    }
  }, [currentPath, setValues]);

  function onGetFilms(evt) {
    evt.preventDefault();
    if (currentPath === '/movies') {
      findMovies(values.name);
      localStorage.setItem('search', values.name);
    } else {
      findMoviesUser(values.name);
    }
  }

  return (
    <div className='search'>
      <div className='search__wrapper-3'>
        <div className='search__wrapper'>
          <form action='1' className='search__form'>
            <input
              placeholder='Введите название'
              type='text'
              className='search__input'
              required
              minLength='1'
              maxLength='400'
              name='name'
              value={values.name || ''}
              onChange={handleChange}
              id='name-input'
            ></input>

            <button
              type='submit'
              onClick={onGetFilms}
              className='search__submit'
              disabled={!isValid}
            ></button>
          </form>
          {currentPath === '/movies'
            ? errors.name && (
                <span className='search__input-error'>Enter request</span>
              )
            : ''}
          {isLoading === false && storageFilms.length < 1 ? (
            <p>Ничего не найдено</p>
          ) : (
            ''
          )}
          {errorRequest === true ? (
            <p>
              Во время запроса произошла ошибка. Возможно, проблема с
              соединением или сервер недоступен. Подождите немного и попробуйте
              ещё раз
            </p>
          ) : (
            ''
          )}
        </div>
        <div className='search__wrapper-2'>
          <p className='search__label'>Short</p>
          <label className='search__switch'>
            <input
              className='search__checkbox'
              type='checkbox'
              onChange={handleCheckbox}
              // checked={checked}
              defaultChecked={checked}
            />
            <span className='search__slider'></span>
          </label>
        </div>
      </div>

      <div className='search__line'></div>
    </div>
  );
}
