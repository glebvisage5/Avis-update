import style from './Main.module.css';
import config from '../Config.json';
import One from './One/One';
import Two from './Two/Two';
import Three from './Three/Three';
import Four from './Four/Four';
import Five from './Five/Five';
import Six from './Six/Six';
import Footer from './Footer/Footer';

export default function Main({}){
    const info = config.One_info[0];

    return(
        <>
            <One className={style.AppOne} developers={info.developers} projects={info.projects} />
            <Two className={style.AppTwo} config={config.Two_info} />
            <Three className={style.AppThree} config={config.Three_info} />
            <Four className={style.AppFour} config={config.Four_info} />
            <Five className={style.AppFive} config={config.Five_info} />
            <Six className={style.AppSix} config={config.Six_info} />
            <Footer className={style.AppFooter} />
        </>
    )
}