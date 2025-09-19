import style from './Social.module.css'

export default function Social(){
    const social = [
        {img: '/social/tg.svg', value: 'Telegram', button: 'Привязать аккаунт'},
        // {img: '/social/behance.svg', value: 'Behance', button: 'Привязать аккаунт'},
        {img: '/social/github.svg', value: 'GitHub', button: 'Привязать аккаунт'},
        {img: '/social/vk.svg', value: 'Вконтакте', button: 'Привязать аккаунт'},
        {img: '/social/hhru.svg', value: 'HeadeHunter', button: 'Привязать аккаунт'}
    ] 

    return(
        <>
            <section className={style.Social}>
                {social.map(({ img, value, button }) => (
                    <div key={img} className={style.all}>
                        <div className={style.Logo_text}>
                            <img src={img} alt="Logo" />
                            <p>{value}</p>
                        </div>
                        <p className={style.buttons}>{button}</p>
                    </div>
                ))}
            </section>
        </>
    )
}