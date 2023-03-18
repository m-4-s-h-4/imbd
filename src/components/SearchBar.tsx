import React, { ChangeEvent, KeyboardEvent } from 'react';
import styles from '../styles/SearchBar.module.css';
import buttonStyles from '../styles/Button.module.css';

//search for movies

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.containerInput}>
      <input
        type="text"
        placeholder="Movie title..."
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={styles.containerInput_input}
      />
      <button className={buttonStyles.cta} onClick={handleSearch}>
        <span>Search</span>
        <svg viewBox="0 0 13 10" height="10px" width="15px">
          <path d="M1,5 L11,5"></path>
          <polyline points="8 1 12 5 8 9"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
