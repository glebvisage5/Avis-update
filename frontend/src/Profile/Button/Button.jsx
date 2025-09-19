import style from './Button.module.css';

export default function Button({src_white, src_black, text, active, onClick}){
    return(
        <>
            <div className={`${style.Button} ${active ? style.active : ''}`} onClick={onClick}>
                <img src={active ? src_white : src_black} alt={text} />
                <p>{text}</p>
            </div>
        </>
    )
}