import React, { useEffect, useState } from 'react';
import style from './Group.module.css';
import Error from '../../../Error/Error';

export default function Group({ priority }) {
    const [members, setMembers] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editedStatus, setEditedStatus] = useState('');

    const token = localStorage.getItem('token');

    const groupName = user?.study_group || (members.length > 0 ? members[0].study_group : '')

    useEffect(() => {
        async function fetchMembers() {
        try {
            const res = await fetch('http://localhost:5000/api/group/members', {
                headers: { Authorization: 'Bearer ' + token },
            });
            if (!res.ok) throw new Error('Ошибка загрузки участников группы');
            const data = await res.json();
            const sortedMembers = data.members.sort((a, b) => {
                const nameA = (a.name).toLowerCase();
                const nameB = (b.name).toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });
            setMembers(sortedMembers);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        }
        async function fetchUser() {
            try {
                const profileRes = await fetch('http://localhost:5000/api/profile', {
                    headers: { Authorization: 'Bearer ' + token },
                });
                if (!profileRes.ok) throw new Error('Ошибка загрузки профиля');
                const profileData = await profileRes.json();
                setUser(profileData.user);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchUser();
        fetchMembers();
    }, [token]);

    const startEdit = (id, currentStatus) => {
        setEditingId(id);
        setEditedStatus(currentStatus || '');
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditedStatus('');
    };

    const saveStatus = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/group/members/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({ position: editedStatus }),
            });
            if (!res.ok) throw new Error('Ошибка при сохранении статуса');
            const updated = await res.json();

            setMembers((prev) =>
                prev.map((m) => (m.id === id ? { ...m, position: updated.position } : m))
            );
            setEditingId(null);
            setEditedStatus('');
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <p className={style.text}>Загрузка участников...</p>;
    if (error) return <p className={style.text} style={{ color: 'red' }}>Ошибка: {error}</p>;
    if (!members.length) return <p className={style.text}>В вашей группе нет других участников.</p>;

    return (
        <section className={style.Group}>
            <p className={style.Header_text}>Участники вашей группы {groupName}</p>
            <table className={style.Table}>
                <thead>
                    <tr>
                        <th className={style.Col1}>№</th>
                        <th className={style.Col2}>Фамилия Имя</th>
                        <th className={style.Col3}>Статус</th>
                        {priority === 1 && <th className={style.Col4}>Действие</th>}
                    </tr>
                </thead>
                <tbody>
                    {members.map((m, i) => {
                        const isCurrentUser = m.name === user?.name;
                        const isEditing = editingId === m.id;
                        return (
                        <tr key={m.id} className={`${style.MemberRow} ${isCurrentUser ? style.Name_active : ''}`}>
                            <td className={style.Col1}>{i + 1}</td>
                            <td className={style.Col2}>{m.name || m.login}</td>
                            <td className={style.Col3}>
                                {isEditing ? (
                                    <input type="text" value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)} autoFocus/>
                                ) : (
                                    m.position || 'Статус не указан'
                                )}
                            </td>
                            {priority === 1 && (
                                <td className={style.Col4}>
                                    {isEditing ? (
                                        <div className={style.Buttons}>
                                            <button className={style.ActionBtn} onClick={() => saveStatus(m.id)} disabled={!editedStatus.trim()}>Сохранить</button>
                                            <button className={style.ActionBtn} onClick={cancelEdit}>Отмена</button>
                                        </div>
                                        ) : isCurrentUser ? (
                                            <button className={style.ActionBtnUser} disabled>Это вы</button>
                                        ) : (
                                            <button className={style.ActionBtn} onClick={() => startEdit(m.id, m.position)}> Редактировать</button>
                                    )}
                                </td>
                            )}
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </section>
    );
}
