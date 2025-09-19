import style from './Card.module.css'
import Cards from './Cards/Cards'

export default function Card({config}){
    return(
        <>
            <section className={style.Card}>
                {config.map((item, index) => (
                    <Cards key={index} className={item.className} img={item.img} headertxt={item.headertxt} footertxt={item.footertxt} />
                ))}
            </section>
        </>
    )
}