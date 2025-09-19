const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await pool.query(
      'UPDATE users SET auth_token = NULL WHERE id = $1',
      [req.user.userId]
    );
    res.json({ message: 'Успешный выход' });
  } catch (error) {
    console.error('Ошибка выхода:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;