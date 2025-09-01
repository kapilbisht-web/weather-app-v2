import React from 'react';
import '../SearchBar.css';
import { FaSearch } from 'react-icons/fa';

const Search = ({ onSearch, city, setCity }) => {
  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
      </div>
      <button className="search-button" onClick={onSearch}>
        Get Weather
      </button>
    </div>
  );
};

export default Search;