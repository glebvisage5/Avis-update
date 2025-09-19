const express = require('express');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { encrypt, safeDecrypt } = require('../utils/encryption');

function getTokenFromHeader(req) {
  const auth = req.headers['authorization'];
  return auth && auth.split(' ')[1];
}

function decryptUser(userData) {
  return {
    login: userData.login,
    position: userData.position,
    priority: userData.priority,
    email: userData.email,
    name: safeDecrypt(userData.name),
  };
}

function decryptProfile(profileData) {
  return {
    gender: profileData.gender,
    birthdate: profileData.birthdate,
    phone: safeDecrypt(profileData.phone),
    study_group: safeDecrypt(profileData.study_group),
    university: safeDecrypt(profileData.university),
  };
}

router.get('/profile', async (req, res) => {
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).json({ message: 'Не авторизован' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const userProfileQuery = `
      SELECT 
        u.login,
        u.position,
        u.priority,
        u.email,
        u.name,
        p.gender,
        p.birthdate,
        p.phone,
        p.study_group,
        p.university
      FROM users u
      LEFT JOIN user_profiles p ON u.id = p.user_id
      WHERE u.id = $1
    `;
    const userProfileResult = await pool.query(userProfileQuery, [userId]);

    if (userProfileResult.rows.length === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    const userData = userProfileResult.rows[0];

    const user = decryptUser(userData);
    const profile = decryptProfile(userData);

    res.json({ user, profile });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Сессия истекла. Пожалуйста, войдите снова.' });
    }
    console.error(error);
    res.status(500).json({ message: 'Ошибка при получении данных' });
  }
});

router.put('/profile', async (req, res) => {
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).json({ message: 'Не авторизован' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { user, profile } = req.body;

    await pool.query(
      `UPDATE users SET
        login = $1,
        email = $2,
        position = $3,
        name = $4
       WHERE id = $5`,
      [user.login, user.email, user.position, encrypt(user.name), userId]
    );

    await pool.query(
      `INSERT INTO user_profiles (user_id, birthdate, phone, study_group, university, gender)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (user_id) DO UPDATE SET
         birthdate = EXCLUDED.birthdate,
         phone = EXCLUDED.phone,
         study_group = EXCLUDED.study_group,
         university = EXCLUDED.university,
         gender = EXCLUDED.gender`,
      [userId, profile.birthdate, encrypt(profile.phone), encrypt(profile.study_group), encrypt(profile.university), profile.gender]
    );

    // Получаем уже обновлённые данные
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    const profileResult = await pool.query('SELECT * FROM user_profiles WHERE user_id = $1', [userId]);

    const decryptedUser = decryptUser(userResult.rows[0]);
    const decryptedProfile = decryptProfile(profileResult.rows[0]);

    res.json({ user: decryptedUser, profile: decryptedProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка обновления профиля' });
  }
});

module.exports = router;
