import React from 'react';
import '../WeahterCard.css';
import { generateWeatherSummary, getTimeGreeting} from './WeatherSummary.js';

function WeatherCard({ weather }) {
  if (!weather || !weather.weather || !weather.weather[0]) {
    alert("Weather data is missing or incomplete. Please try again.");
    return null;
  }

  const condition = weather.weather[0].main.toLowerCase();
  const temperature = weather.main.temp;
const summary = `${getTimeGreeting()} ${generateWeatherSummary(weather.weather[0].main, temperature)}`;
  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString();

  return (
    <div className={`weather-card ${condition}`}>
      <h2>{weather.name}</h2>
      <p>{weather.weather[0].description}</p>
       <p className="weather-summary">{summary}</p>
      <p>Temp: {weather.main.temp}°C</p>
      <p>Feels Like: {weather.main.feels_like}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind: {weather.wind.speed} m/s</p>
      <p>Pressure: {weather.main.pressure} hPa</p>
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
    </div>
  );
}

export default WeatherCard;