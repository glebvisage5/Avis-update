import style from './EditSubjectModal.module.css'
import React, { useState, useEffect } from 'react'

export default function EditSubjectModal({ subject, onClose, onEdit, onDelete }) {
    const [form, setForm] = useState({
        id: null,
        name: '',
        department: '',
        color: '#000000',
        image_path: '',
        max_tasks: 0,
        hard_deadline: '',
        soft_deadline: '',
        max_score: 0
    })

    useEffect(() => {
        if (subject) {
            setForm({
                id: subject.id,
                name: subject.name || '',
                department: subject.department || '',
                color: subject.color || '#000000',
                image_path: subject.image_path || '',
                max_tasks: subject.max_tasks || 0,
                hard_deadline: formatDateTimeLocal(subject.hard_deadline) || '',
                soft_deadline: formatDateTimeLocal(subject.soft_deadline) || '',
                max_score: subject.max_score || 0,
            })
        }
    }, [subject])

    function formatDateTimeLocal(dateString) {
        if (!dateString) return '';
        const dt = new Date(dateString);
        if (isNaN(dt)) return '';
        
        const year = dt.getFullYear();
        const month = String(dt.getMonth() + 1).padStart(2, '0');
        const day = String(dt.getDate()).padStart(2, '0');
        const hours = String(dt.getHours()).padStart(2, '0');
        const minutes = String(dt.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    function handleChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        onEdit(form)
    }
    function handleDelete() {
        if (window.confirm('Удалить предмет? Это действие нельзя отменить.')) {
            onDelete(subject.id)
        }
    }

    return (
        <section className={style.Model}>
            <div className={style.ModalWindow}>
                <p>Редактировать предмет</p>
                <form onSubmit={handleSubmit} className={style.Form}>
                    <label>
                        Название:
                        <input name="name" value={form.name} onChange={handleChange} required />
                    </label>
                    <label>
                        Кафедра:
                        <input name="department" value={form.department} onChange={handleChange} required />
                    </label>
                    <label>
                        Путь к изображению:
                        <input type="text" name="image_path" value={form.image_path} onChange={handleChange} placeholder="card_task/akms.png" required />
                    </label>
                    <label>
                        Цвет:
                        <input type="color" name="color" value={form.color} onChange={handleChange} required />
                    </label>
                    <label>
                        Макс. задач:
                        <input type="number" name="max_tasks" value={form.max_tasks} onChange={handleChange} min="0" required />
                    </label>
                    <label>
                        Жесткий дедлайн:
                        <input type="datetime-local" name="hard_deadline" value={form.hard_deadline} onChange={handleChange} />
                    </label>
                    <label>
                        Мягкий дедлайн:
                        <input type="datetime-local" name="soft_deadline" value={form.soft_deadline} onChange={handleChange} />
                    </label>
                    <label>
                        Макс. балл:
                        <input type="number" name="max_score" value={form.max_score} onChange={handleChange} min="0" required />
                    </label>

                    <button className={style.Add} type="submit">Сохранить</button>
                    <button className={style.Close} type="button" onClick={onClose}>Отмена</button>
                    <button className={style.Delete} type="button" onClick={handleDelete}>Удалить</button>
                </form>
            </div>
        </section>
    )
}
