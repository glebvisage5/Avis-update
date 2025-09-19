import style from './Task.module.css'
import React, { useState, useEffect } from 'react'
import EditSubjectModal from '../EditSubjectModal/EditSubjectModal';
import GoogleSheetTable from './GoogleSheetTable/GoogleSheetTable';
import Error from '../../../../Error/Error';


export default function Task({onClick, item, priority, onUpdate, onOpenEditModal, onCloseEditModal, showEditModal, editSubject,setEditSubject, onDeleteSubject}) {
    const { color, name, department, readys, max_tasks, hard_deadline, soft_deadline, max_score, link } = item;
    const ready = readys || 5
    const maxHeightVw = 15.63;
    const progressVw = max_tasks && ready ? Math.min((ready / max_tasks) * maxHeightVw, maxHeightVw) : 0;

    const [isEditingLink, setIsEditingLink] = useState(false)
    const [linkInput, setLinkInput] = useState(link || '')

    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const token = localStorage.getItem('token');

    const [tableHeaders, setTableHeaders] = useState([])

    useEffect(() => {
        setLinkInput(link || '');

        async function fetchData() {
            try {
                const profileRes = await fetch('http://localhost:5000/api/profile', {
                    headers: { Authorization: 'Bearer ' + token },
                });
                if (!profileRes.ok) throw new Error('Ошибка загрузки задач');
                const profileData = await profileRes.json();
                setProfile(profileData.profile);
                setUser(profileData.user)
            } catch (err) {
                setError(err.message);
                if (err.response?.status === 401) {
                    setError('Сессия истекла. Перезагрузите страницу (F5).');
                } else setError('Перезагрузите страницу (F5).')
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [link]);

    function openEdit() {
        setEditSubject(item);
        onOpenEditModal();
    }

    async function handleEditSubject(updatedSubject) {
        await onUpdate(updatedSubject);
        onCloseEditModal();
    }

    function toggleLinkEdit() {
        setIsEditingLink(prev => !prev)
    }

    async function saveLink() {
        console.log('saveLink called')
        const updatedSubject = {
            ...item,
            link: linkInput,
        }
        console.log('Saving subject:', updatedSubject)
        await onUpdate(updatedSubject)
        setIsEditingLink(false)
    }

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;

    return(
        <>
            <section className={style.Header}>
                <div className={style.Component}>
                    <section className={style.Name}>
                        <div className={style.Head}>
                            <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                id="Vector"
                                d="M4.01398 8.6558C4.25676 8.33913 4.55232 8.06467 4.82678 7.79022C5.53402 7.15687 6.33626 6.70297 7.01184 6.03795C8.58466 4.4968 8.933 1.95283 7.9302 0C8.933 0.242785 9.80914 0.791689 10.5586 1.39337C13.2926 3.58899 14.3693 7.46299 13.0815 10.7881C13.0392 10.8936 12.997 10.9992 12.997 11.1364C12.997 11.3687 13.1553 11.5798 13.3665 11.6642C13.6092 11.7698 13.8626 11.7064 14.0631 11.5376C14.1231 11.4874 14.1732 11.4265 14.2109 11.3581C15.4037 9.84861 15.5937 7.68466 14.7915 5.9535C16.5543 7.3891 17.5149 9.81695 17.3777 12.1076C17.3144 12.6354 17.251 13.1632 17.0716 13.6909C16.9238 14.3243 16.6388 14.9576 16.3221 15.5171C15.1821 17.3433 13.2081 18.6522 11.0864 18.9161C8.82744 19.2011 6.41015 18.7894 4.67899 17.2272C2.74727 15.4749 2.0717 12.667 3.06395 10.2603L3.20117 9.98584C3.42285 9.50027 4.01398 8.6558 4.01398 8.6558ZM7.34962 15.306C7.64519 15.5593 8.13076 15.8338 8.51077 15.9393C9.69303 16.3616 10.8753 15.7704 11.572 15.0738C10.3158 14.7782 9.56635 13.8493 9.34468 12.9098C9.16523 12.0653 9.50302 11.3687 9.64025 10.5559C9.76692 9.77472 9.7458 9.1097 9.4608 8.38135C9.26023 8.78247 9.04912 9.18359 8.79578 9.50027C7.98298 10.5559 6.70572 11.0203 6.43127 12.4559C6.38904 12.6037 6.36793 12.7515 6.36793 12.9098C6.33626 13.7754 6.71627 14.7254 7.34962 15.306Z"
                                fill={color}
                                fillOpacity={0.65}
                            />
                            </svg>
                            <p>{name}</p>
                        </div>
                        <p className={style.Departament}>{department}</p>
                    </section>

                    <section className={style.Button}>
                        <div onClick={onClick} className={style.Back}>
                            <div>
                                <img src="/card_task/back.svg" alt="Back arrow" />
                                <p>Вернуться</p>
                            </div>
                        </div>
                        {priority === 1 && (
                            <div className={style.Edit} onClick={openEdit}>
                                <div>
                                    <img src="/card_task/edit.svg" alt="Edit" />
                                    <p>Редактировать</p>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </section>
            
            <section className={style.Center_bar}>
                <section className={style.Table_Task}>
                    <section className={style.Table}>
                        <div className={style.Table_comp}>
                            <p className={style.Table_head}>Таблица с данными</p>
                            {priority === 1 && (
                                <div className={style.Edit} onClick={toggleLinkEdit}>
                                    <div>
                                        <img src="/card_task/edit.svg" alt="Edit" />
                                        <p>Редактировать ссылку</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        {isEditingLink && (
                            <div className={style.Create_link}>
                                <input type="text" value={linkInput} onChange={e => setLinkInput(e.target.value)} placeholder="google sheets"/>
                                <div className={style.Button_link}>
                                    <button className={style.Save_link} onClick={saveLink}>Сохранить</button>
                                    <button className={style.Close_link} onClick={() => setIsEditingLink(false)}>Отмена</button>
                                </div>
                            </div>
                        )}
                        {!isEditingLink && item.id && (
                            <GoogleSheetTable subjectId={item.id} studyGroup={profile?.study_group} names={user?.name} onHeadersLoaded={(headers) => {setTableHeaders(headers)}} maxColumns={max_tasks}/>
                        )}
                    </section>

                    <section className={style.TasksBlocksContainer}>
                        {tableHeaders.slice(0, max_tasks).map((header, index) => (
                            <div key={index} className={style.TaskBlock}>
                                <p className={style.Header_text}>{header}</p>
                                <div className={style.Data}>
                                    <div className={style.Task_value}>
                                        <p>Баллы:</p>
                                        <p className={style.Value}>/ </p>
                                    </div>
                                    <div className={style.Task_value}>
                                        <p>Дедлайн:</p>
                                        <p className={style.Value}>23.05</p>
                                    </div>
                                    <div className={style.Task_value}>
                                        <p>Сниж. баллов</p>
                                        <p className={style.Value}> </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                </section>

                <section className={style.Prog_Dead}>
                    <section className={style.Progress}>
                        <div className={style.SvgBackground} style={{ height: `${progressVw}vw` }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 261" preserveAspectRatio="xMidYMax meet" fill="none">
                                <path width='100%' fillRule="evenodd" clipRule="evenodd" d="M181.033 8.09401C188.084 2.86233 197.055 0 206.31 0C206.804 7.15291e-08 207.299 0.00816419 207.795 0.0245674C217.572 0.348111 226.847 3.85324 233.767 9.8391C240.523 15.6827 249.531 19.1664 259.069 19.624C268.607 20.0816 278.005 17.4811 285.467 12.3197L300 2.26738V239.607C300 251.422 288.807 261 275 261H25C11.1929 261 0 251.422 0 239.607V2.26738L14.5333 12.3197C21.9928 17.483 31.3898 20.086 40.9276 19.631C50.4655 19.176 59.4749 15.695 66.2333 9.85353C73.1505 3.86562 82.4247 0.357842 92.2015 0.0316233C101.978 -0.294596 111.537 2.5848 118.967 8.09401L121.967 10.315C138.1 22.2856 161.9 22.2856 178.033 10.315L181.033 8.09401Z" fill={color} fillOpacity={0.65}/>
                            </svg>
                        </div>
                        <div className={style.ProgressContent}>
                            <div className={style.Progress_head}>
                                <p className={style.head}>Прогресс</p>
                                <p className={style.math}>{((ready / max_tasks) * 100).toFixed(2)}%</p>
                            </div>

                            <div className={style.Text}>
                                <p>Выполнено задач:</p>
                                <p>{ready} / {max_tasks}</p>
                            </div>
                        </div>
                    </section>

                    <section className={style.Deadline}>
                        <div className={style.ProgressContent}>
                            <div className={style.Progress_head}>
                                <p className={style.head}>Дедлайн</p>
                                <p className={style.math}>10</p>
                            </div>
                        </div>
                    </section>

                    <button className={style.Edit_Task}>Изменить данные заданий</button>
                </section>
            </section>

            {showEditModal && editSubject && (
                <EditSubjectModal subject={editSubject} onClose={onCloseEditModal} onEdit={handleEditSubject} onDelete={onDeleteSubject}/>
            )}
        </>
    )
}