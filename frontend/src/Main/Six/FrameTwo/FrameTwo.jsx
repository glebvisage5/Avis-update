import style from './FrameTwo.module.css'

export default function FrameTwo({config}){
    return(
        <>
            {config.Two.map((item, index) => (
                <div className={style.Frame} key={index}>
                    <label className={style.Label} htmlFor="name">{item.label}</label>
                    <textarea  className={style.Input} type={item.type} name="name" />
                </div>
            ))}
        </>
    )
}