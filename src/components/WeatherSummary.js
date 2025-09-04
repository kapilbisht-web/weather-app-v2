export const weatherMoods = {
  Clear: "Bright and sunny 🌞 — perfect for a rooftop chai break 🫖.",
  Rain: "Rainy vibes incoming 🌧️. Grab a book 📖 and a hot cup of chai 🫖.",
  Clouds: "Overcast skies ☁️ — a mellow day for deep work 💻 or long walks 🚶.",
  Thunderstorm: "Stormy outside ⛈️ — maybe stay in 🏠 and binge something cozy 🍿.",
  Mist: "A misty morning 🌫️ — feels like a scene from a Bollywood film 🎬."
};

export const generateWeatherSummary = (condition, temp) => {
  const mood = weatherMoods[condition] || "Weather's doing its own thing today.";
  return `Today’s forecast: ${condition} with ${temp}°C. ${mood}`;
};

export const getTimeGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning! ☀️";
  if (hour < 18) return "Good afternoon!🌤️";
  return "Good evening! 🌇";
};