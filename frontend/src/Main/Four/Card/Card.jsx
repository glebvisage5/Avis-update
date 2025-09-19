import style from './Card.module.css'

export default function Card({className, img, headertxt, footertxt}){
    return(
        <>
            <section className={style.Card}>
                <img className={style[className]} src={img} />
                <div className={style.Text}>
                    <div className={style.Headertxt}>{headertxt}</div>
                    <div className={style.Footertxt}>{footertxt}</div>
                </div>
            </section>
        </>
    )
}