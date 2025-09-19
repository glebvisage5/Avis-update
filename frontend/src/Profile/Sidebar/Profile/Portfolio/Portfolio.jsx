import style from './Portfolio.module.css';

export default function Portfolio({ portfolios = [], onEditProject, onAddProject }) {
    return (
        <div className={style.Portfolios}>
            {portfolios.map((portfolio) => (
                <div key={portfolio.id} className={style.PortfolioCard} onClick={() => onEditProject(portfolio)}>
                    <div className={style.ContentCard}>
                        <img src="/logo.png" alt="" />
                        <div className={style.InfoCard}>
                            <section className={style.TitleCard}>
                                <div className={style.Title}>{portfolio.title || 'Название'}</div>
                                <div className={style.Description}>{portfolio.description || 'Описание'}</div>
                            </section>
                            <section className={style.Info}>
                                <div className={style.Startap}>
                                    <div>{portfolio.type || 'Тип'}</div>
                                    <div>{portfolio.year || 'Год'}</div>
                                </div>
                                <div style={{ color: '#FBA63C' }}>{portfolio.status || 'Статус'}</div>
                            </section>
                        </div>
                    </div>
                </div>
            ))}
            <div className={style.AddCard} onClick={onAddProject}>
                <div>
                    <img src="/card_task/add.svg" alt="" />
                    <p>Добавить проект</p>
                </div>
            </div>
        </div>
    );
}
