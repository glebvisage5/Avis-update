const express = require('express');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { safeDecrypt, encrypt } = require('../utils/encryption');

function getTokenFromHeader(req) {
    const auth = req.headers['authorization'];
    return auth && auth.split(' ')[1];
}

router.get('/group/members', async (req, res) => {
    const token = getTokenFromHeader(req);
    if (!token) return res.status(401).json({ message: 'Не авторизован' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const userGroupResult = await pool.query(
            'SELECT study_group FROM user_profiles WHERE user_id = $1',
            [userId]
        );
        if (userGroupResult.rows.length === 0) {
            return res.status(404).json({ message: 'Профиль пользователя не найден' });
        }
        const myGroupEncrypted = userGroupResult.rows[0].study_group;
        const myGroup = safeDecrypt(myGroupEncrypted);

        const membersResult = await pool.query(`
            SELECT u.id, u.login, u.name, u.position, p.study_group, p.university
            FROM users u
            JOIN user_profiles p ON u.id = p.user_id
        `);

        const filteredMembers = membersResult.rows.filter(m => safeDecrypt(m.study_group) === myGroup);

        const decryptedMembers = filteredMembers.map(m => ({
            ...m,
            name: safeDecrypt(m.name),
            position: m.position,
            study_group: safeDecrypt(m.study_group),
            university: safeDecrypt(m.university),
        }));

        res.json({ members: decryptedMembers });
    } catch (error) {
        console.error('Ошибка получения участников группы:', error);
        res.status(500).json({ message: 'Ошибка получения участников группы' });
    }
});

router.put('/group/members/:id/status', async (req, res) => {
    const token = getTokenFromHeader(req);
    if (!token) return res.status(401).json({ message: 'Не авторизован' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const memberId = parseInt(req.params.id, 10);
        const { position } = req.body;

        if (!position || typeof position !== 'string' || position.trim() === '') {
            return res.status(400).json({ message: 'Неверный статус' });
        }

        if (userId !== memberId) {
            const userRes = await pool.query('SELECT priority FROM users WHERE id = $1', [userId]);
            if (userRes.rows.length === 0 || userRes.rows[0].priority !== 1) {
                return res.status(403).json({ message: 'Нет доступа' });
            }
        }

        await pool.query(
            'UPDATE users SET position = $1 WHERE id = $2',
            [position.trim(), memberId]
        );

        res.json({ position: position.trim() });
    } catch (err) {
        console.error('Ошибка обновления статуса:', err);
        res.status(500).json({ message: 'Ошибка обновления статуса' });
    }
});

module.exports = router;