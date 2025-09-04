import React from 'react';
import '../SearchBar.css';
import { FaSearch } from 'react-icons/fa';



const SearchBar = ({ onSearch, city,weather, setCity, onSave,onUseLocation }) => {
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

      <div className="button-group">
        <button
          type="button"
          className="search-button"
          onClick={onSearch}
          disabled={!city.trim()}
        >
          🔍 Get Weather
        </button>

        <button
          type="button"
          className="save-button"
        onClick={() => {
    if (!city.trim()) {
      alert("⚠️ Please enter a city name before saving.");
      return;
    }
    if (!weather) {
      alert("⚠️ Please fetch the weather before saving.");
      return;
    }
    onSave(); // Proceed with saving
  }}

          
        >
          💾 Save Weather
        </button>
         <button
          type="button"
          className="location-button"
          onClick={onUseLocation}
        >
          📍 Use My Location
        </button>

      </div>
    </div>
  );
};

export default SearchBar;