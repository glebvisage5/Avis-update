import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './Profile.module.css';
import config from './config.json';
import Button from './Button/Button';
import Sidebar from './Sidebar/Sidebar';
import Error from '../Error/Error';

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeButton, setActiveButton] = useState('Панель');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = "#E9F1FF";

        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                
                if (!token) {
                    throw new Error('Токен не найден');
                }

                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: { 
                        'Authorization': `Bearer ${token}` 
                    }
                });
                
                setUserData(response.data);
            } catch (err) {
                console.error('Ошибка загрузки профиля:', err);
                setError(err.message);
                
                if (err.response?.status === 401) {
                    setError(<Error status={err.response?.status}/>);
                } else {
                    setError(<Error status={err.response?.status}/>);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();

        return () => {
            document.body.style.backgroundColor = '';
        }
    }, []);

    async function updateUserData(updatedData) {
        try{
            const token = localStorage.getItem('token')
            const response = await axios.put('http://localhost:5000/api/profile', updatedData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                }
            });
            setUserData(response.data)
        }catch(err){
            alert('Ошибка при обновлении данных профиля')
            console.error(err)
        }
    }

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/logout', {}, {
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            });
            
            localStorage.removeItem('token');
            navigate('/login');
        } catch (err) {
            console.error('Ошибка выхода:', err);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const handleButtonClick = (buttontext) =>{
        if (buttontext === 'Выйти'){
            return(
                <>
                    <div>
                        <button>Отмена</button>
                        <button onClick={handleLogout()}></button>
                    </div>
                </>
            )
        }else{
            setActiveButton(buttontext);
        }
    }

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;

    const handleMainClick = () => {
        navigate('/')
    }

    const studyGroup = userData?.profile?.study_group || null;
    
    return (
        <>
            <section className={style.Sidebar}>
                <div className={style.Frame}>
                    <section className={style.User}>
                        <div className={style.photo}></div>
                        <div className={style.text}>
                            <h3>{userData.user.name || 'Имя Фамилия'}</h3>
                            <p>{userData.user.position}</p>
                        </div>
                    </section>
                    <section className={style.bar}>
                        <section className={style.bar_one}>
                            {config.One_bar.map((item, index) => (
                                <Button key={index} src_white={item.src_white} src_black={item.src_black} text={item.text} active={activeButton === item.text}
                                onClick={() => handleButtonClick(item.text)} />
                            ))}
                            <div className={style.rest}></div>
                        </section>
                        <section className={style.bar_two}>
                            {config.Two_bar.map((item, index) => (
                                <Button key={index} src_white={item.src_white} src_black={item.src_black} text={item.text} active={activeButton === item.text}
                                onClick={() => handleButtonClick(item.text)} />
                            ))}
                        </section>
                    </section>
                </div>
            </section>
            <section className={style.Navigate}>
                <div className={style.Logo} onClick={handleMainClick}>
                    <img src="logo.png" alt="Logo" />
                    <p>Avis</p>
                </div>
                <div className={style.Input}>
                    <img src="/profile/search.svg" alt="" />
                    <input type="text" name="" id="" placeholder='Поиск' />
                </div>
                <div className={style.Language}>
                    <img className={style.Flag} src="/profile/Flag.svg" alt="flag" />
                    <p>Русский</p>
                    <img className={style.Shape} src="/profile/Shape.svg" alt="Shape" />
                </div>
                <div className={style.Theme}>
                    <div className={style.Light}><img src="/profile/light.svg" alt="Light" /></div>
                </div>
                <img className={style.Bell} src="/profile/Bell.svg" alt="Bell" />
            </section>

            <Sidebar activeButton={activeButton} priority={userData.user.priority} updateUserData={updateUserData}/>
        </>
    );
}