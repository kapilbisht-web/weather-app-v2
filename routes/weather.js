// server/routes/weather.js
import express from 'express';
import WeatherLog from '../models/WeatherLog.js'; // ✅ Use default import
const router = express.Router(); // ✅ Create router instance

router.post('/logWeather', async (req, res) => {
  try {
    const log = new WeatherLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save weather log' });
  }
});

router.get('/history', async (req, res) => {
  try {
    const logs = await WeatherLog.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});
console.log('Fetching history...');

export default router;