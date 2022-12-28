import React from 'react';
import './SearchForm.css';

export default function SearchForm() {
  return (
    <div className='search'>
      <div className='search__wrapper'>
        <form action='1' className='search__form'>
          <input
            placeholder='Movie'
            type='text'
            className='search__input'
            required
          ></input>
          <button type='submit' className='search__submit'></button>
        </form>
        <div className='search__wrapper-2'>
          <p className='search__label'>KorotkoMetragki</p>
          <label className='search__switch'>
            <input
              className='search__checkbox'
              type='checkbox'
              //   onChange={handleCheckbox}
                checked
            />
            <span className='search__slider'></span>
          </label>
        </div>
      </div>

      <div className='search__line'></div>
    </div>
  );
}
