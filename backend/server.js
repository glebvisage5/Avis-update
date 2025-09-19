const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const pool = require('./config/db');
require('dotenv').config();

const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const subjectsRouters = require('./routes/subjects');
const profileRouters = require('./routes/profile');
const portfolioRoutes = require('./routes/portfolio');
const groupRoutes = require('./routes/group');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Маршруты
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/subjects', subjectsRouters);
app.use('/api', profileRouters);
app.use('/api', portfolioRoutes);
app.use('/api', groupRoutes)

// Телеграмм бот
/*if (process.env.NODE_ENV === 'production') {
  require('./telegram_bot');
}*/

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
