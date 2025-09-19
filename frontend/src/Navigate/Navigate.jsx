import style from './Navigate.module.css'
import Logo from '/logo.png'
import LoginBg from '/LoginBg.svg'
import Chervak from '/Chervak.svg'
import BackLatex from '/BackLatex.svg'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Navigate(){

    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);

    const handleLoginClick = () => {
        navigate(isAuthenticated ? '/profile' : '/login');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/recover';
    const isServiceLatex = location.pathname === '/service/latex';

    const scrollPage = (args) => {
        const scrollDistance = window.innerWidth * (args / 100);
        window.scrollBy({
            top: scrollDistance,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token')
            if (!token){
                setisAuthenticated(false)
                return
            }
            try{
                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: { 
                        'Authorization': `Bearer ${token}` 
                    }
                })
                setisAuthenticated(true)
                setUserData(response.data)
            } catch(error){
                localStorage.removeItem('token')
                setisAuthenticated(false)
            }
        }
        checkAuth()
    }, [location.pathname])

    return(
        <>
            {isLoginOrRegister && (
                <>
                    <img className={style.LoginBg} src={LoginBg} />
                    <img className={style.Chervak} src={Chervak} />
                </>
            )}
            {isServiceLatex && (
                <>
                    <img className={style.BackLatex} src={BackLatex} />
                </>
            )}
            <section 
                className={style.Navigate} 
                style={{
                    boxShadow: isLoginOrRegister || isServiceLatex ? '0 0.21vw 0.21vw 0 rgba(0, 0, 0, 0.25)' : 'none',
                    position: isLoginOrRegister || isServiceLatex ? 'absolute' : 'none',
                    left: isLoginOrRegister || isServiceLatex ? '0' : 'none',
                    top: isLoginOrRegister || isServiceLatex ? '0' : 'none',
                }}
            >
                <a href="/">
                    <div className={style.Logo} style={{marginLeft: isLoginOrRegister ? '5.3vw': 'none'}}>
                        <img className={style.LogoImg} src={Logo} />
                        <p className={style.LogoP}>Avis</p>
                    </div>
                </a>
                <div className={style.Navigation}>
                    <a href="/">Главная</a>
                    <a onClick={() => scrollPage(45)}>О нас</a>
                    <a href="/projects">Проекты</a>
                    <a href="">Отзывы</a>
                    <a onClick={() => scrollPage(260)}>Обратная связь</a>
                </div>
                <div className={style.NavigationP}>
                    <img src="/Stroke.svg" />
                </div>
                <div className={style.NavigateButton} style={{justifyContent: isAuthenticated ? 'center': 'none'}}>
                    {isAuthenticated ? (
                        <button className={style.ProfileButton} onClick={handleLoginClick}>{userData.user.priority === 1 ? userData.user.login : 'Профиль'}</button>
                    ) : (
                        <>
                            <button className={style.ButtonAuth} onClick={handleLoginClick}>Войти</button>
                            <button className={style.ButtonReg} onClick={handleRegisterClick}>Регистрация</button>
                        </>
                    )}
                </div>
            </section>
        </>
    )
}
