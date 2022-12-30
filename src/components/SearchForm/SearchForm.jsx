import React from 'react';
import './SearchForm.css';
import useForm from '../../hooks/useForm';

export default function SearchForm({
  getAllMovies,
  // setSearch,
  findMovies,
}) {
  const { values, errors, handleChange, isFormValid } = useForm();

  function onGetFilms(evt) {
    evt.preventDefault();
    getAllMovies();
    // setSearch(evt.target.value);
    localStorage.setItem('name', values.name);
    findMovies(values.name);
    console.log(localStorage);
  }
  return (
    <div className='search'>
      <div className='search__wrapper'>
        <form action='1' className='search__form'>
          <input
            placeholder='Movie'
            type='text'
            className='search__input'
            required
            minLength='2 '
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
          ></button>
        </form>
        <div className='search__wrapper-2'>
          <p className='search__label'>KorotkoMetragki</p>
          <label className='search__switch'>
            <input
              className='search__checkbox'
              type='checkbox'
              //   onChange={handleCheckbox}
              // checked
            />
            <span className='search__slider'></span>
          </label>
        </div>
      </div>

      <div className='search__line'></div>
    </div>
  );
}
