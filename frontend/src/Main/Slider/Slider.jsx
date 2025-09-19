import React, { useState } from 'react';
import style from './Slider.module.css';
import arrowr from '/arrow/arrowr.svg';

export default function Slider({ onSliderChange }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const totalDots = 4;

    const moveSlider = (direction) => {
        setActiveIndex((prevIndex) => {
            const newIndex = direction === 'left'
                ? (prevIndex > 0 ? prevIndex - 1 : totalDots - 1)
                : (prevIndex < totalDots - 1 ? prevIndex + 1 : 0);

            onSliderChange(newIndex);
            return newIndex;
        });
    };

    return (
        <div className={style.SliderContainer}>
            <img
                src={arrowr}
                className={`${style.arrow} ${style.arrowl} ${activeIndex === 0 ? style.activear : ''}`}
                onClick={() => moveSlider('left')}
            />
            <div className={style.dots}>
                {Array.from({ length: totalDots }).map((_, index) => (
                    <div key={index} className={`${style.dot} ${activeIndex === index ? style.active : ''}`}></div>
                ))}
            </div>
            <img
                src={arrowr}
                className={`${style.arrow} ${style.arrowr} ${activeIndex === 3 ? style.activear : ''}`}
                onClick={() => moveSlider('right')}
            />
        </div>
    );
}
