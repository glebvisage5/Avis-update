import style from './Login.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import tg from '/tg.svg'

export default function Login(){
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!login || !password) {
            setError('Пожалуйста, заполните все поля.');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                login,
                password,
            });
            
            const { token } = response.data;
            localStorage.setItem('token', token);
        
            navigate('/profile');
            } catch (error) {
            setError(error.response?.data?.message || 'Ошибка авторизации');
            }
    };
    
    const handleCheckboxChange = () => {
        setShowPassword(prevState => !prevState);
    };

    return(
        <>
            <section className={style.Login}>
                <div className={style.FormLogin}>
                    <h2 className={style.LoginH2}>Вход</h2>
                    <a className={style.LoginA} href="/register">Зарегистрироваться</a>
                    <form className={style.LoginForm} onSubmit={handleSubmit}>
                        <div className={style.LabelLoginForm}>
                            <div className={style.FormGroup}>
                                <label className={style.Label} htmlFor="login">Логин</label>
                                <input className={style.Input}
                                    type="text"
                                    id="login"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                />
                            </div>
                            <div className={style.FormGroup}>
                                <label className={style.Label} htmlFor="password">Пароль</label>
                                <input className={style.Input}
                                    type = {showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <label className={style.OpenPassword}><input type="checkbox" checked={showPassword} onChange={handleCheckboxChange}/><p>Показать пароль</p></label>
                        <a className={style.RecoverA} href="/recover">Восстановить пароль</a>
                        <div className={style.FooterLogin}>
                            <button type="submit" className={style.LoginBtn}>Войти</button>
                            <div className={style.FrameLogin}>
                                <div className={style.LineLogin}></div>
                                <p>или</p>
                                <div className={style.LineLogin}></div>
                            </div>
                            <div className={style.FormGroup}>
                                <label className={style.Label} htmlFor="telegram">Войти через</label>
                                <button className={style.TelegramLogin} type='submit' id='telegram'><img src={tg} className={style.TgImg} />Telegram</button>
                            </div>
                            <p className={style.FooterText}>Рекомендуем использовать <span>режим инкогнито</span> для входа с <br />
                            чужого устройства</p>
                        </div>
                    </form>
                </div>
                {error && <p className={style.ErrorMessage}>{error}</p>}
            </section>
        </>
    )
}