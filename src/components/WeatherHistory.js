import React from "react";
import '../WeatherHistory.css';

const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case "rain":
      return "🌧️";
    case "clouds":
      return "☁️";
    case "clear":
      return "☀️";
    case "snow":
      return "❄️";
    case "thunderstorm":
      return "⛈️";
    case "drizzle":
      return "🌦️";
    default:
      return "🌡️";
  }
};

const WeatherHistory = ({ history }) => {
  if (!history.length) {
    return <p className="empty-msg">🕳️ No weather logs saved yet.</p>;
  }

  return (
    <div className="history-section">
      <h3>📚 Weather History</h3>
      <ul>
        {history.map((log, index) => (
          <li key={index} className="history-item">
            <strong>{log.city}</strong> – {log.temperature}°C – {getWeatherIcon(log.condition)} {log.condition} – 
            {new Date(log.createdAt).toLocaleString('en-IN', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherHistory;