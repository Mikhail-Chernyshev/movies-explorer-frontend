import React from 'react';
import './SearchForm.css';
import useForm from '../../hooks/useForm';

export default function SearchForm({
  findMovies,
  activeChooseShort,
  checkedOrNotCheched,
  isChooseShort,
  handleSearch,
  currentPath,
}) {
  // const checkbox =
  //   currentPath === '/movies' && localStorage.chooseShort !== 'undefined'
  //     ? JSON.parse(localStorage.chooseShort)
  //     : false;

  // const checked = localStorage.chooseShort
  //   ? JSON.parse(localStorage.chooseShort)
  //   : '';
  const { values, handleChange, errors, setValues, setErrors } = useForm();
  function handleCheckbox() {
    activeChooseShort();
  }
  React.useEffect(() => {
    setValues({ name: localStorage.getItem('name') });
  }, []);

  function onGetFilms(evt) {
    evt.preventDefault();

    // setSearch(evt.target.value);
    localStorage.setItem('name', values.name);
    findMovies(values.name);
  }

  return (
    <div className='search'>
      <div className='search__wrapper-3'>
        <div className='search__wrapper'>
          <form action='1' className='search__form'>
            <input
              placeholder={localStorage.name}
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
            ></button>
          </form>
          {errors.name && (
            <span className='search__input-error'>
              Нужно ввести ключевое слово
            </span>
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
              // defaultChecked={checkbox}
            />
            <span className='search__slider'></span>
          </label>
        </div>
      </div>

      <div className='search__line'></div>
    </div>
  );
}
