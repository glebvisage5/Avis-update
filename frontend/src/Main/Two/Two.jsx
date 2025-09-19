import React, { useState, useEffect } from 'react';
import style from './Two.module.css';
import Card from './Card/Card';
import Slider from '../Slider/Slider';

export default function Two({ className, config }) {
    const [visibleCards, setVisibleCards] = useState([]);
    const [Sliders, setSliders] = useState(false);
    const [isTextVisible, setIsTextVisible] = useState(true);

    const handleSliderChange = (activeIndex) => {
        if (activeIndex === 0) {
            setIsTextVisible(true);
            setVisibleCards([]);
        } else {
            setIsTextVisible(false);
            let cardsToShow = [];

            if (activeIndex === 1) {
                cardsToShow = config.slice(0, 2);
            } else if (activeIndex === 2) {
                cardsToShow = config.slice(2, 4);
            } else if (activeIndex === 3) {
                cardsToShow = config.slice(4, 5);
            }

            setVisibleCards(cardsToShow);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setSliders(true);
                setIsTextVisible(true);
                setVisibleCards([]);
            }else{
                setSliders(false);
                setVisibleCards(config.slice(0, 5))
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className={`${className} ${style.Two}`}>
            <section className={`${style.HeaderText} ${isTextVisible ? style.TwoHeaderPWithMargin : ''}`}>
                <h1 className={style.Twoh1}>
                    Что вы получите при <span className={style.Twoh1span}>работе с Avis?</span>
                </h1>
                {isTextVisible && (
                    <p className={style.TwoHeaderP}>
                        Avis — это студия разработчиков, специально созданная для того, чтобы вы могли воплощать свои идеи в реальные продукты быстро, качественно и просто. Мы предлагаем различные подходы к реализации ваших идей на разных языках программирования и создаем красивые дизайны.
                    </p>
                )}
            </section>

            {visibleCards.length > 0 && <Card config={visibleCards} />}

            {Sliders && <Slider onSliderChange={handleSliderChange} />}
        </section>
    );
}
