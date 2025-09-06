import mongoose from 'mongoose';

const WeatherLogSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  condition: String,
  icon: String,
}, { timestamps: true });

const WeatherLog = mongoose.model('WeatherLog', WeatherLogSchema);
export default WeatherLog;