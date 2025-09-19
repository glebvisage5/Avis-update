import React, {useState, useEffect} from 'react'
import style from './Dashboard.module.css'
import Subjects from './Subjects/Subjects'

export default function Dashboard(){
    const [subjects, setSubjects] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchData(){
            try{
                const subjectsRes = await fetch('http://localhost:5000/api/subjects', {
                    headers: { Authorization: 'Bearer ' + token },
                });
                if (!subjectsRes.ok) throw new Error('Ошибка загрузки предметов')
                const data = await subjectsRes.json()
                setSubjects(data)
            } catch(err){
                setError(err.message)
            } finally{
                setLoading(false)
            }
        }

        fetchData()
    })

    if (loading) return <p className={style.Loading}>Загрузка...</p>;
    if (error) return <p className={style.Loading} style={{ color: 'red' }}>Ошибка: {error}</p>;

    return(
        <>
            <div className={style.Dashboard}>
                <section className={style.TaskProgress}>
                    <p className={style.Header_text}>Прогресс задач 
                        <div className={style.Ellipses}>
                            <div className={style.Ellipse}></div>
                            <div className={style.Ellipse}></div>
                            <div className={style.Ellipse}></div>
                        </div>
                    </p>
                    <div className={style.Subjects}>
                        {subjects && subjects.map((subject) => (
                            <Subjects key={subject.id} subject={subject} />
                        ))}
                    </div>
                    <p className={style.Footer_text}>Данное меню можно скролить</p>
                </section>

                <section className={style.Calendar}>
                    <p className={style.Header_text}>Календарь
                        <div className={style.Ellipses}>
                            <div className={style.Ellipse}></div>
                            <div className={style.Ellipse}></div>
                            <div className={style.Ellipse}></div>
                        </div>
                    </p>
                </section>

                <section className={style.Table_Leaders}>
                    <p className={style.Header_text}>Таблица лидеров
                        <div className={style.Ellipses}>
                            <div className={style.Ellipse}></div>
                            <div className={style.Ellipse}></div>
                            <div className={style.Ellipse}></div>
                        </div>
                    </p>
                </section>

                <section className={style.Deadlines}>
                    <p className={style.Header_text}>Дедлайны
                        <div className={style.Ellipses}>
                            <div className={style.Ellipse}></div>
                            <div className={style.Ellipse}></div>
                            <div className={style.Ellipse}></div>
                        </div>
                    </p>
                </section>

                <section className={style.Grade}>
                    <p className={style.Header_text}>Успеваемость
                        <div className={style.Ellipses}>
                            <div className={style.Ellipse}></div>
                            <div className={style.Ellipse}></div>
                            <div className={style.Ellipse}></div>
                        </div>
                    </p>
                </section>
            </div>
        </>
    )
}