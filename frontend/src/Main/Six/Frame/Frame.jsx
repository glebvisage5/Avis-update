import style from './Frame.module.css'

export default function Frame({config}){
    return(
        <>
            {config.One.map((item, index) => (
                <div className={style.Frame} key={index}>
                    <label className={style.Label} htmlFor="name">{item.label}</label>
                    <input className={style.Input} type={item.type} name="name" />
                </div>
            ))}
        </>
    )
}