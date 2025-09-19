import React, {useEffect, useState} from 'react'
import style from './Three.module.css'
import Card from './Card/Card'
import Slider from '../Slider/Slider'

export default function Three({className, config}){
    const [visibleCards, setVisibleCards] = useState([]);
    const [Sliders, setSliders] = useState(false);
    const [isTextVisible, setIsTextVisible] = useState(true);
    return(
        <>
            <section className={`${className} ${style.Three}`}>
                <div className={style.Text}>
                    <h1>Используемые языки</h1>
                    <p>Для разработки применяются различные языки программирования для обеспечения высокой функциональности, интерактивности и надежности. Каждый из них выбран за свои уникальные возможности и эффективность в выполнении конкретных задач разработки.</p>
                </div>
                <div className={`${style.Card} ${style.CardOne}`}>
                    {config.One.map((item, index) => (
                        <Card key={index} img={item.img} headertxt={item.headertxt} footertxt={item.footertxt} />
                    ))}
                </div>
                <div className={`${style.Card} ${style.CardTwo}`}>
                    {config.Two.map((item, index) => (
                        <Card key={index} img={item.img} headertxt={item.headertxt} footertxt={item.footertxt} />
                    ))}
                </div>
                {Sliders && <Slider />}
            </section>
        </>
    )
}