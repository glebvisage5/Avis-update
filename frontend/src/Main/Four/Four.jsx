import style from './Four.module.css'
import Card from './Card/Card'

export default function Four({className, config}){
    return(
        <>
            <section className={`${className} ${style.Four}`}>
                <section className={style.Info}>
                    <div className={style.Text}>
                        <div className={style.Header}>Наши проекты</div>
                        <div className={style.Main}>Демонстрируем вам наши проекты, созданные с использованием современных технологий. Каждый проект отражает наш профессионализм и стремление к качеству. Готовы к сотрудничеству с нами?</div>
                    </div>
                    <button>Связаться</button>
                </section>
                <div className={`${style.Card} ${style.CardOne}`}>
                    {config.One.map((item, index) => (
                        <Card key={index} className={item.className} img={item.img} headertxt={item.headertxt} footertxt={item.footertxt} />
                    ))}
                </div>
                <div className={`${style.Card} ${style.CardTwo}`}>
                    {config.Two.map((item, index) => (
                        <Card key={index} className={item.className} img={item.img} headertxt={item.headertxt} footertxt={item.footertxt} />
                    ))}
                </div>
                <a className={style.AllProjects} href='/projects'>Все проекты</a>
            </section>
        </>
    )
}