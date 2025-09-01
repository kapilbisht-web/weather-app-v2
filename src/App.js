import React, { useState } from 'react';
import './App.css';

import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherIcons from './components/WeatherIcons';
import Logo from './components/Logo';
import { ThemeProvider } from './components/ThemeContext.js';
import ThemeToggle from './components/ThemeToggle.js';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 👈 Added loading state

  const fetchWeather = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const apiKey = process.env.REACT_APP_API_KEY;

    if (!apiUrl || !apiKey) {
      alert("API configuration missing. Check your .env file.");
      return;
    }

    try {
      setIsLoading(true); // 👈 Start loading
      const res = await fetch(`${apiUrl}?q=${city}&units=metric&appid=${apiKey}`);
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      alert('Error fetching weather');
      console.error(err);
    } finally {
      setIsLoading(false); // 👈 End loading
    }
  };

  return (
    <ThemeProvider>
      <div className="app">
        <ThemeToggle />
        <Logo />
        <SearchBar city={city} setCity={setCity} onSearch={fetchWeather} />

        {/* 👇 Conditional rendering without spinner */}
        {isLoading && (
          <p style={{ textAlign: 'center', marginTop: '2rem', fontStyle: 'italic' }}>
            Fetching weather data...
          </p>
        )}

        {!isLoading && weather && <WeatherCard weather={weather} />}
        <WeatherIcons />
      </div>
    </ThemeProvider>
  );
}

export default App;