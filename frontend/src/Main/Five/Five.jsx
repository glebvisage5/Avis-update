import style from './Five.module.css'

export default function Five({config, className}){
    return(
        <>
            <section className={`${className} ${style.Five}`}>
                <section className={style.Head}>
                    <div className={style.H1}>Отзывы</div>
                    <div className={style.P}>Место, где вы можете узнать, что думают наши клиенты о качестве нашей продукции и уровне обслуживания. Здесь собраны искренние мнения тех, кто уже воспользовался нашими услугами. Мы ценим каждое ваше слово, ведь именно ваши отзывы помогают нам становиться лучше и предлагать вам только лучший сервис.</div>
                </section>
                {config.map((item, index) => (
                    <section key={index} className={style.Foot}>
                        <img className={style.Img} src={item.img} />
                        <div className={style.Info}>
                            <div className={style.Text}>
                                <div className={style.txt_stars}>
                                    <div className={style.headertxt}>
                                        <div className={style.nameproject}>{item.nameproject}</div>
                                        <div className={style.user}>{item.user}</div>
                                    </div>
                                    <div className={style.Stars}>
                                        <img src="/iconn.svg" alt="" />
                                        <img src="/icona.svg" alt="" />
                                        <img src="/icona.svg" alt="" />
                                        <img src="/icona.svg" alt="" />
                                        <img src="/icona.svg" alt="" />
                                    </div>
                                </div>
                                <div className={style.text}>{item.text}</div>
                            </div>
                            <button className={style.Btn}>Все отзывы</button>
                        </div>
                    </section>
                ))}
            </section>
        </>
    )
}