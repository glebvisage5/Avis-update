import style from './Cards.module.css'

export default function Cards({className, img, headertxt, footertxt}){
    return(
        <>
            <section className={`${style[className]}`}>
                <div className={style.Main}>
                    <img className={style.Img} src={img} />
                    <div className={style.Headertxt}>{headertxt}</div>
                    <div className={style.Footertxt}>{footertxt}</div>
                </div>
            </section>
        </>
    )
}