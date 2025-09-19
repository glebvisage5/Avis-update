const express = require('express')
const router = express.Router()
const subjects = require('../database/subjects')
const Papa = require('papaparse')

router.get('/:id/link-data', async (req, res) => {
  try {
    const subjectId = req.params.id;
    const group = req.query.group;

    const subject = await subjects.getSubjectById(subjectId);
    if (!subject || !subject.link) {
      return res.status(404).json({ error: 'Ссылка не найдена' });
    }

    const match = subject.link.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (!match) {
      return res.status(400).json({ error: 'Некорректная ссылка' });
    }
    const spreadsheetId = match[1];

    if (!group) {
      return res.status(400).json({ error: 'Группа не указана' });
    }

    // Формируем ссылку с именем листа (название группы)
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(group)}`;

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(500).json({ error: 'Не удалось получить данные из Google Sheets' });
    }
    const csvText = await response.text();

    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (parsed.errors.length) {
      return res.status(500).json({ error: 'Ошибка парсинга CSV' });
    }

    res.json(parsed.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Получить все предметы
router.get('/', async (req, res) => {
  try {
    const data = await subjects.getAllSubjects()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Получить предмет по id
router.get('/:id', async (req, res) => {
  try {
    const subject = await subjects.getSubjectById(req.params.id)
    if (!subject) return res.status(404).json({ error: 'Not found' })
    res.json(subject)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Создать предмет
router.post('/', async (req, res) => {
  try {
    const newSubject = await subjects.createSubject(req.body)
    res.status(201).json(newSubject)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Обновить предмет
router.put('/:id', async (req, res) => {
  try {
    const updated = await subjects.updateSubject(req.params.id, req.body)
    if (!updated) return res.status(404).json({ error: 'Not found' })
    res.json(updated) 
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Удалить предмет
router.delete('/:id', async (req, res) => {
  try {
    await subjects.deleteSubject(req.params.id)
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router