import style from './AddSubjectModal.module.css'
import React, {useState} from 'react'

export default function AddSubjectModal({onClose, onAdd}){
    const [form, setForm] = useState({
        name: '',
        department: '',
        color: '#000000',
        image_path: '',
        max_tasks: 0,
        hard_deadline: '',
        soft_deadline: '',
        max_score: 0,
    })

    function handleChange(e){
        const {name, value} = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        onAdd(form)
    }

    return(
        <>
            <section className={style.Model}>

                <div className={style.ModalWindow}>
                    <p>Добавить новый предмет</p>
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

                        <button className={style.Add} type="submit">Добавить</button>
                        <button className={style.Close} type="button" onClick={onClose}>Отмена</button>
                    </form>
                </div>
            </section>
        </>
    )
}