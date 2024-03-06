import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = props => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = event => {
    setSearchInput(event.target.value);
  };

  const onSubmitHandler = props.onSubmit;

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onSubmitHandler}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          name="searchInput"
          autoComplete="off"
          autoFocus
          placeholder="Type here to search images and photos..."
          onChange={handleSearchInputChange}
          value={searchInput}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
