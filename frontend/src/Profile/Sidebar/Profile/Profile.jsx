import React, { useState, useEffect } from 'react';
import style from './Profile.module.css';
import DataItem from './DataItem/DataItem';
import AddCardModal from './AddCardModal/AddCardModal';
import ProfileEditModal from './ProfileEdit/ProfileEditModal';
import Social from './Social/Social';
import Portfolio from './Portfolio/Portfolio';
import Error from '../../../Error/Error';

export default function Profile({ onUpdateProfile }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const [portfolios, setPortfolios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalCardData, setModalCardData] = useState(null);
    const [cardType, setCardType] = useState('portfolio');

    const token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchData() {
            try {
                const profileRes = await fetch('http://localhost:5000/api/profile', {
                    headers: { Authorization: 'Bearer ' + token },
                });
                if (!profileRes.ok) throw new Error('Ошибка загрузки профиля');
                const profileData = await profileRes.json();
                setUser(profileData.user);
                setProfile(profileData.profile);
                const portfolioRes = await fetch('http://localhost:5000/api/portfolio', {
                    headers: { Authorization: 'Bearer ' + token },
                });
                if (!portfolioRes.ok) throw new Error('Ошибка загрузки портфолио');
                const portfolioData = await portfolioRes.json();
                setPortfolios(portfolioData);
            } catch (err) {
                setError(err.message);
                if (err.response?.status === 401) {
                    setError(<Error status={err.response?.status}/>);
                } else {
                    setError(<Error status={err.response?.status}/>);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchData();
        if (showEditModal || showModal) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, [showEditModal, showModal, token]);



    async function handleSave(updatedData) {
        try {
            const res = await fetch('http://localhost:5000/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify(updatedData),
            });
            if (!res.ok) throw new Error('Ошибка при сохранении профиля');
            const data = await res.json();
            setUser(data.user);
            setProfile(data.profile);
            await onUpdateProfile(updatedData);
            setShowEditModal(false);
        } catch (err) {
            alert(err.message);
        }
    }

    async function handleSaveCard(cardData) {
        try {
            if (modalCardData) {
                const res = await fetch(`http://localhost:5000/api/portfolio/${modalCardData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                    body: JSON.stringify(cardData),
                });
                if (!res.ok) throw new Error('Ошибка обновления проекта');
                const updatedPortfolio = await res.json();
                setPortfolios((prev) =>
                    prev.map((item) => (item.id === updatedPortfolio.id ? updatedPortfolio : item))
                );
            } else {
                const res = await fetch('http://localhost:5000/api/portfolio', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                    body: JSON.stringify(cardData),
                });
                if (!res.ok) throw new Error('Ошибка добавления проекта');
                const newPortfolio = await res.json();
                setPortfolios((prev) => [...prev, newPortfolio]);
            }
            setShowModal(false);
        } catch (err) {
            alert(err.message);
        }
    }

    const handleEditProject = (project) => {
        setModalCardData(project);
        setCardType('portfolio');
        setShowModal(true);
    };

    const handleAddProject = () => {
        setModalCardData(null);
        setCardType('portfolio');
        setShowModal(true);
    };

    function calculateAge(birthdate) {
        if (!birthdate) return '—';
        const birth = new Date(birthdate);
        if (isNaN(birth.getTime())) return '—';

        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age >= 0 ? age : '—';
    }
    function getAgeSuffix(age) {
        if (typeof age !== 'number' || age < 0) return '';
        const lastDigit = age % 10;
        const lastTwoDigits = age % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return 'лет';
        }
        if (lastDigit === 1) {
            return 'год';
        }
        if (lastDigit >= 2 && lastDigit <= 4) {
            return 'года';
        }
        return 'лет';
    }

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;

    const age = calculateAge(profile?.birthdate);
    const ageWithSuffix = age !== '—' ? `${age} ${getAgeSuffix(age)}` : '—';

    const personalData = [
        { label: 'Логин', value: user?.login || '' },
        { label: 'Пол', value: profile?.gender || '' },
        { label: 'Почта', value: user?.email || '' },
        { label: 'Возраст', value: ageWithSuffix || '' },
        { label: 'Дата рождения', value: profile?.birthdate || '' },
        { label: 'Статус', value: user?.position || '' },
        { label: 'Телефон', value: profile?.phone || '' },
        { label: 'Вуз', value: profile?.university || '' },
        { label: 'information', value: 'information' },
    ];

    return (
        <>
        <section className={style.Center_bar}>
            <div className={style.Photo}>
                <p className={style.Header_text}>Фотография</p>
                <div className={style.Ellipse}></div>
                <p className={style.Edit_Photo}>Изменить</p>
            </div>

            <div className={style.Personal_Data}>
            <p className={style.Header_text}>Личные данные</p>
            <div className={style.Header_info}>
                <div className={style.Name}>
                    <p>{user?.name || 'Имя Фамилия Отчество'}</p>
                </div>
                <div className={style.Group}>{profile?.study_group || 'Группа'}</div>
                <div className={style.University}>{'ИИТ'}</div>
            </div>
            <div className={style.Data}>
                {personalData.map(({ label, value }) => (
                    <DataItem key={label} label={label} value={value} />
                ))}
            </div>
                <p className={style.Edit_Data} onClick={() => setShowEditModal(true)}>Редактировать</p>
            </div>

            <div className={style.Social}>
                <p className={style.Header_text}>Социальные сети</p>
                <Social />
            </div>

            <div className={style.Portfolio}>
                <p className={style.Header_text}>Портфолио</p>
                <Portfolio portfolios={portfolios} onEditProject={handleEditProject} onAddProject={handleAddProject}/>
                <p className={style.Portfolio_info}>Для редактирования информации, нажмите на карточку проекта</p>
            </div>

            <div className={style.Achievements}>
                <p className={style.Header_text}>Достижения</p>
            </div>
        </section>

        {showEditModal && (
            <ProfileEditModal user={user} profile={profile} priority={user?.priority || 2} onSave={handleSave} onClose={() => setShowEditModal(false)}/>
        )}
        {showModal && (
            <AddCardModal isOpen={showModal} onClose={() => setShowModal(false)} cardData={modalCardData} onSave={handleSaveCard}cardType={cardType}/>
        )}
        </>
    );
}
