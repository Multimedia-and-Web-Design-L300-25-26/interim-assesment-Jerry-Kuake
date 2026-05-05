const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

console.log('Starting server...');
console.log('MONGO_URI starts with:', process.env.MONGO_URI?.slice(0, 20));

const authRoutes = require('./routes/auth');
const cryptoRoutes = require('./routes/crypto');

console.log('Routes loaded');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use('/api', authRoutes);
app.use('/api/crypto', cryptoRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.log('Express error:', err.message);
  res.status(500).json({ message: 'Something went wrong' });
});

console.log('Connecting to MongoDB...');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log('MongoDB connection failed:', err.message);
    process.exit(1);
  });
