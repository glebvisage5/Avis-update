const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Не авторизован' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    // 1. Проверка подписи токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 2. Хеширование токена для сравнения с БД
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    
    // 3. Проверка в базе данных
    const result = await pool.query(
      `SELECT id, login, priority 
       FROM users 
       WHERE id = $1 
         AND auth_token = $2 
         AND token_expires > NOW()`,
      [decoded.userId, tokenHash]
    );

    if (result.rows.length === 0) {
      throw new Error('Недействительный токен');
    }

    // 4. Добавляем пользователя в запрос
    req.user = {
      userId: decoded.userId,
      login: result.rows[0].login,
      priority: result.rows[0].priority
    };
    
    next();
  } catch (err) {
    console.error('Ошибка аутентификации:', err.message);
    return res.status(401).json({ error: 'Требуется повторная авторизация' });
  }
};