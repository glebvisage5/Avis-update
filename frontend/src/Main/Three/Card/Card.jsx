import style from './Card.module.css'

export default function Card({img, headertxt, footertxt}){
    return(
        <>
            <div className={style.Cards}>
                <img className={style.Img} src={img} />
                <div className={style.Text}>
                    <div className={style.Headertxt}>{headertxt}</div>
                    <div className={style.Footertxt}>{footertxt}</div>
                </div>
            </div>
        </>
    )
}