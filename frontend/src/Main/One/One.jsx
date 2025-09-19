import style from './One.module.css'
import ImgPerson from '/person.png'
import BlockDev from '/people.svg'
import BlockProject from '/book.svg'

export default function One({className, developers, projects}){
    return(
        <>
            <section className={`${className} ${style.One}`}>
                <p className={style.OneHeadP}>Погружайтесь в мир IT <br /><span>Легко и Уверенно!</span></p>
                {/* <p className={style.OneCenterP}>Avis — студия разработки, предлагающая полный спектр решений для <br />бизнеса: от создания современных сайтов до разработки комплексных <br />приложений с серверной частью.</p>
                <button className={style.OneButton}>Начать</button> */}
                <img className={style.ImgPerson} src={ImgPerson} />
                <section className={style.BlockDeveloper}>
                    <div className={style.BlcDev}><img className={style.ImgBlockDev} src={BlockDev} /></div>
                    <p className={style.BlockDevP}>{ developers }<br /><span className={style.BlockDevSpan}>Разработчиков</span></p>
                </section>
                <section className={`${style.BlockDeveloper} ${style.BlockProject}`}>
                    <div className={style.BlcProject}><img className={style.ImgBlockDev} src={BlockProject} /></div>
                    <p className={style.BlockProjP}>Проектов<br /><span className={style.BlockProjSpan}>{ projects }</span></p>
                </section>
            </section>
        </>
    )
}