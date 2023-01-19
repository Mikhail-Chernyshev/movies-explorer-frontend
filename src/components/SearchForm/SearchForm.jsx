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
  //   currentPath === '/movies' && localStorage.chooseShort !== ''
  //     ? JSON.parse(localStorage.chooseShort)
  //     : 'false';

  const checked =
    currentPath === '/movies' && localStorage.chooseShort
      ? JSON.parse(localStorage.chooseShort)
      : '';
  const { values, handleChange, errors, setValues, setErrors } = useForm();
  function handleCheckbox() {
    activeChooseShort();
  }
  React.useEffect(() => {
    if (currentPath === '/movies') {
      setValues({ name: localStorage.getItem('search') });
    }
  }, [currentPath]);

  function onGetFilms(evt) {
    evt.preventDefault();
    findMovies(values.name);
    if (currentPath === '/movies') {
      localStorage.setItem('search', values.name);
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
