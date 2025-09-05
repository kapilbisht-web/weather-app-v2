import React from 'react';
import '../SearchBar.css';
import { FaSearch } from 'react-icons/fa';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchBar = ({ onSearch, city, weather, setCity, onSave, onUseLocation }) => {
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
  onClick={() => {
    if (!city.trim()) {
      toast.error("⚠️ Please enter a city name before searching.");
      return;
    }
    onSearch(); // Only call if valid
  }}
>
  🔍 Get Weather
</button>

       <button
  type="button"
  className="save-button"
  onClick={() => {
    if (!city.trim()) {
      toast.error("⚠️ Please enter a city name before saving.");
      return;
    }
    if (!weather) {
      toast.error("⚠️ Please fetch the weather before saving.");
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

      <ToastContainer />
    </div>
  );
};

export default SearchBar;