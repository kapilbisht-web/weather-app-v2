import React, { useState, useEffect } from 'react';
import './App.css';
import { ToastContainer} from 'react-toastify';

import OfflineBanner from './components/OfflineBanner';
import useOnlineStatus from './components/OnlineStatus.js';
import WeatherHistory from './components/WeatherHistory';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherIcons from './components/WeatherIcons';
import Logo from './components/Logo';
import { ThemeProvider } from './components/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

const TIME_THRESHOLD_MINUTES = 30;
function App() {
  const isOnline= useOnlineStatus();
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

 const fetchWeather = async () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
 
   
if (!apiUrl || !apiKey) {
  alert("API configuration missing. Check your .env file.");
  return;
}

  try {
    setIsLoading(true);
    const res = await fetch(`${apiUrl}?q=${city}&units=metric&appid=${apiKey}`);
    const data = await res.json();

    if (res.ok && data.cod === 200) {
      setWeather(data);
    } else {
      setWeather(null); // Clear invalid data
      alert(`❌ ${data.message || "Invalid city name"}`);
    }
  } catch (err) {
    setWeather(null); // Clear on error
    alert('Error fetching weather');
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};

  const fetchHistory = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/history');
      const data = await res.json();
       const sortedData = data
      .filter(entry => entry.createdAt) // optional: filter out invalid entries
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setHistory(sortedData);

    // Shows only the 5 most recent searches
    setHistory(sortedData.slice(0,5));
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleSaveWeather = async () => {
    if (!weather) return;
      
   const date = new Date();

const isDuplicateRecent = history.some(entry => {
  const sameCity = entry.city === weather.name;
  const sameCondition = entry.condition === weather.weather[0].main;
  const timeDiff = (date - new Date(entry.createdAt)) / (1000 * 60); // in minutes
  return sameCity && sameCondition && timeDiff < TIME_THRESHOLD_MINUTES;
});

if (isDuplicateRecent) {
  alert("⚠️ Weather log already exists for this city and condition within the last 30 minutes");
  setIsSaveDisabled(true);

  // Re-enable after threshold expires
  setTimeout(() => setIsSaveDisabled(false), TIME_THRESHOLD_MINUTES * 60 * 1000);

  return;
}

    try {
      await fetch('http://localhost:5000/api/logWeather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: weather.name,
          temperature: weather.main.temp,
          condition: weather.weather[0].main,
          icon: weather.weather[0].icon,
           createdAt: new Date().toISOString()
        }),
      });
      fetchHistory(); // Refresh history after saving
    } catch (error) {
      console.error('Error saving weather:', error);
    }
  };
  const handleUseLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  setIsLoading(true);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const apiUrl = process.env.REACT_APP_API_URL;
      const apiKey = process.env.REACT_APP_API_KEY;

      try {
        const res = await fetch(`${apiUrl}?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
        const data = await res.json();

        if (res.ok && data.cod === 200) {
          setWeather(data);
          setCity(data.name); // Optional: update city input with detected location
        } else {
          setWeather(null);
          alert(`❌ ${data.message || "Unable to fetch weather for your location"}`);
        }
      } catch (err) {
        console.error("Geolocation fetch error:", err);
        alert("Error fetching weather for your location.");
      } finally {
        setIsLoading(false);
      }
    },
    (error) => {
      console.error("Geolocation error:", error);
      alert("Unable to retrieve your location.");
      setIsLoading(false);
    }
  );
};

  useEffect(() => {
    fetchHistory();
  }, []);
  useEffect(() => {
  console.log('Saved history:', history);
}, [history]);


return (
  <ThemeProvider>
    <div className="app">
      <ThemeToggle />
      <Logo />
      <div className="app-container">
        {!isOnline && <OfflineBanner />}
      </div>

      <SearchBar
        city={city}
        setCity={setCity}
        onSearch={fetchWeather}
        onSave={handleSaveWeather}
        weather={weather}
        isSaveDisabled={isSaveDisabled}
        onUseLocation={handleUseLocation}
      />

      {isLoading && (
        <p style={{ textAlign: 'center', marginTop: '2rem', fontStyle: 'italic' }}>
          Fetching weather data...
        </p>
      )}

      {!isLoading && weather && <WeatherCard weather={weather} />}
      <WeatherIcons />
      <WeatherHistory history={history} />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  </ThemeProvider>
);
}

export default App;
