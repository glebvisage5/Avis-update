import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Error.module.css'

export default function Error({ status }){
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.background = "url('/background_err.png') no-repeat center center fixed";
        document.body.style.backgroundSize = 'cover';

        return () => {
            document.body.style.background = '';
            document.body.style.backgroundSize = '';
        };
    }, []);

    const handleClick = (text) =>{
        {text === 'auth' ? navigate('/login') : navigate('/')}
    }

    return(
        <>
            <div className={style.Error}>
                <div className={style.Oops}>Oops!</div>
                {status === 401 ? (
                    <>
                        <div className={style.Status}>401 - Unauthorized</div>
                        <div className={style.Message}>В доступе отказано из-за неверных учетных данных или истечения срока действия сеанса.<br />Пожалуйста, войдите в систему еще раз, чтобы продолжить.</div>
                        <button onClick={() => handleClick('auth')}>Авторизация</button>
                    </>
                ) : status === 404 ? (
                    <>
                        <div className={style.Status}>404 - Page Not Found</div>
                        <div className={style.Message}>Возможно, страница, которую вы ищете, была удалена, у нее изменилось название или она временно недоступна.<br />Попробуйте перезагрузить страницу.</div>
                        <button onClick={() => handleClick}>На главную</button>
                    </>
                ) : status === 500 ? (
                    <>
                        <div className={style.Status}>500 - Internal Server Error</div>
                        <div className={style.Message}>Сервер столкнулся с непредвиденным условием, которое помешало ему выполнить запрос.<br />Пожалуйста, повторите попытку позже.</div>
                        <button onClick={() => handleClick}>На главную</button>
                    </>
                ) : (
                    <>
                        <div className={style.Status}>Couldn't upload profile</div>
                        <div className={style.Message}>Не удалось загрузить профиль. Скорее всего Вы не авторизовались.<br />Пожалуйста, войдите в систему еще раз, чтобы продолжить.</div>
                        <button onClick={() => handleClick('auth')}>Авторизация</button>
                    </>
                )}
            </div>
        </>
    )
}