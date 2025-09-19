const pool = require('../config/db')

// Получить все предметы
async function getAllSubjects() {
  const res = await pool.query('SELECT * FROM subjects ORDER BY id')
  return res.rows
}

// Получить предмет по id
async function getSubjectById(id) {
  const res = await pool.query('SELECT * FROM subjects WHERE id = $1', [id])
  return res.rows[0]
}

// Создать новый предмет
async function createSubject(subject) {
  const {
    name,
    department,
    color,
    image_path,
    max_tasks,
    hard_deadline,
    soft_deadline,
    max_score,
    link
  } = subject

  const res = await pool.query(
    `INSERT INTO subjects (name, department, color, image_path, max_tasks, hard_deadline, soft_deadline, max_score, link)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [name, department, color, image_path, max_tasks, hard_deadline, soft_deadline, max_score, link]
  )
  return res.rows[0]
}

// Обновить предмет по id
async function updateSubject(id, subject) {
  const {
    name,
    department,
    color,
    image_path,
    max_tasks,
    hard_deadline,
    soft_deadline,
    max_score,
    link
  } = subject

  const res = await pool.query(
    `UPDATE subjects SET
      name = $1,
      department = $2,
      color = $3,
      image_path = $4,
      max_tasks = $5,
      hard_deadline = $6,
      soft_deadline = $7,
      max_score = $8,
      link = $9
     WHERE id = $10 RETURNING *`,
    [name, department, color, image_path, max_tasks, hard_deadline, soft_deadline, max_score, link, id]
  )
  return res.rows[0]
}

// Удалить предмет по id
async function deleteSubject(id) {
  await pool.query('DELETE FROM subjects WHERE id = $1', [id])
}

module.exports = {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
}
