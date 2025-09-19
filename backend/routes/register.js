const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, login, password } = req.body;

  if (!email || !login || !password) {
    return res.status(400).json({ message: 'Пожалуйста, заполните все поля.' });
  }

  try {
    const checkUserQuery = 'SELECT * FROM users WHERE login = $1 OR email = $2';
    const checkUserResult = await pool.query(checkUserQuery, [login, email]);

    if (checkUserResult.rows.length > 0) {
      return res.status(400).json({ message: 'Пользователь с таким логином или email уже существует.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = 'INSERT INTO users (login, email, password) VALUES ($1, $2, $3)';
    await pool.query(insertQuery, [login, email, hashedPassword]);

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при регистрации пользователя.' });
  }
});

module.exports = router;
