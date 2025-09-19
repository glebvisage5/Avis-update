const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const pool = require('../config/db');
require('dotenv').config();

const router = express.Router();

const generateAuthToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRE || '1h' });
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  return { token, tokenHash };
};

router.post('/', async (req, res) => {
  const { login, password } = req.body;

  // Валидация
  if (!login || !password) {
    return res.status(400).json({ error: 'Все поля обязательны' });
  }

  try {
    // 1. Поиск пользователя
    const userResult = await pool.query(
      `SELECT id, password, priority, position, name 
       FROM users 
       WHERE login = $1`,
      [login.trim()]
    );

    if (userResult.rows.length === 0) {
      await bcrypt.compare(password, '$2a$10$fakehashforsecurity');
      return res.status(401).json({ error: 'Неверные учетные данные' });
    }

    const user = userResult.rows[0];

    // 2. Проверка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Неверные учетные данные' });
    }

    // 3. Генерация токенов
    const { token, tokenHash } = generateAuthToken(user.id);

    // 4. Обновление пользователя в БД
    await pool.query(
      `UPDATE users 
       SET auth_token = $1, 
           token_expires = NOW() + INTERVAL '${process.env.TOKEN_EXPIRE || '1 hour'}',
           last_login = NOW()
       WHERE id = $2`,
      [tokenHash, user.id]
    );

    // 5. Ответ
    res.json({
      token,
      user: {
        id: user.id,
        login,
        name: user.name,
        position: user.position,
        priority: user.priority
      }
    });

  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;