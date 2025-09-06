import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weather.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', weatherRoutes);

// ✅ Add this root route
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

mongoose.connect(process.env.MONGO_DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));