import { useState } from 'react';
import style from './Six.module.css';
import Frame from './Frame/Frame';
import FrameTwo from './FrameTwo/FrameTwo';

export default function Six({ className, config }) {
    const [isFrameVisible, setIsFrameVisible] = useState(true);
    const [isBarSwapped, setIsBarSwapped] = useState(false);
    const [buttonText, setButtonText] = useState("Продолжить");

    const BackClickForm = () => {
        if (!isFrameVisible) {
            alert('Назад нельзя!');
        }
    };

    const GoClickForm = () => {
        setIsFrameVisible(false);
        setIsBarSwapped(true);
        setButtonText("Отправить")
    };

    const BackToForm = () => {
        setIsFrameVisible(true);
        setIsBarSwapped(false);
        setButtonText("Продолжить");
    };

    return (
        <section className={`${className} ${style.All}`}>
            <section className={style.Form_bar}>
                <section className={style.Form_text}>
                    <section className={style.Text}>
                        <div className={style.H1}>Обратная связь</div>
                        <div className={style.P}>
                            Место, где вы можете узнать, что думают наши клиенты о качестве нашей продукции и уровне обслуживания. Здесь собраны искренние мнения тех, кто уже воспользовался нашими услугами. Мы ценим каждое ваше слово, ведь именно ваши отзывы помогают нам становиться лучше и предлагать вам только лучший сервис.
                        </div>
                    </section>

                    <section className={style.Form}>
                        {isFrameVisible && <Frame config={config} />}
                        {!isFrameVisible && <FrameTwo config={config} />}
                    </section>
                </section>

                <section className={`${style.Bar} ${isBarSwapped ? style.Swapped : ''}`}>
                    <div className={style.Active}></div>
                    <div className={style.Passive}></div>
                </section>
            </section>

            <section className={style.Buttons}>
                {isFrameVisible ? (
                    <button className={style.Back} onClick={BackClickForm}>Назад</button>
                ) : (
                    <button className={style.Back} onClick={BackToForm}>Назад</button>
                )}
                <button className={style.Go} onClick={GoClickForm}>{buttonText}</button>
            </section>
        </section>
    );
}
