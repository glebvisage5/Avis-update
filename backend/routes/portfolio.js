    // portfolio.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

function getTokenFromHeader(req) {
    const auth = req.headers['authorization'];
    return auth && auth.split(' ')[1];
}

// Получить все проекты портфолио пользователя
router.get('/portfolio', async (req, res) => {
    const token = getTokenFromHeader(req);
    if (!token) return res.status(401).json({ message: 'Не авторизован' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const result = await pool.query(
            'SELECT * FROM portfolios WHERE user_id = $1 ORDER BY id',
            [userId]
        );

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка при получении портфолио' });
    }
});

// Добавить новый проект в портфолио
router.post('/portfolio', async (req, res) => {
    const token = getTokenFromHeader(req);
    if (!token) return res.status(401).json({ message: 'Не авторизован' });

    const { title, description, type, status, year } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const result = await pool.query(
            `INSERT INTO portfolios (user_id, title, description, type, status, year)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [userId, title, description, type, status, year]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка при добавлении проекта' });
    }
});

// Обновить проект портфолио
router.put('/portfolio/:id', async (req, res) => {
    const token = getTokenFromHeader(req);
    if (!token) return res.status(401).json({ message: 'Не авторизован' });

    const { id } = req.params;
    const { title, description, type, status, year } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const result = await pool.query(
            `UPDATE portfolios SET
                title = $1,
                description = $2,
                type = $3,
                status = $4,
                year = $5
            WHERE id = $6 AND user_id = $7
            RETURNING *`,
            [title, description, type, status, year, id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Проект не найден или доступ запрещен' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка при обновлении проекта' });
    }
});

// Удалить проект портфолио
router.delete('/portfolio/:id', async (req, res) => {
    const token = getTokenFromHeader(req);
    if (!token) return res.status(401).json({ message: 'Не авторизован' });

    const { id } = req.params;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const result = await pool.query(
            'DELETE FROM portfolios WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Проект не найден или доступ запрещен' });
        }

        res.json({ message: 'Проект успешно удален' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка при удалении проекта' });
    }
});

module.exports = router;
