import style from './Footer.module.css'

export default function Footer({className}){
    const scrollPage = (args) => {
        const scrollDistance = window.innerWidth * (args / 100);
        window.scrollBy({
          top: scrollDistance,
          behavior: 'smooth',
        });
    };

    return (
        <>
            <section className={`${className} ${style.Footer}`}>
                <section className={style.All}>
                    <section className={style.Information}>
                        <section className={style.Avis}>
                            <section className={style.Logo}>
                                <img src="/logo.png" alt="" />
                                <div>Avis</div>
                            </section>
                            <div className={style.Idea}>Идеи превращаются в проекты</div>
                            <div className={style.Lang}>
                                <a className={style.Ru} href="/">Русский</a> <a className={style.En} href="/">English</a>
                            </div>
                        </section>
                        <section className={style.Info_button}>
                            <section className={style.Navigate}>
                                Quick Links
                                <section className={style.NLinks}>
                                    <a href='/'>Главная</a>
                                    <a onClick={() => scrollPage(-250)}>О нас</a>
                                    <a href='/'>Проекты</a>
                                    <a href='/'>Отзывы</a>
                                    <a onClick={() => scrollPage(-35)}>Обратная связь</a>
                                </section>
                            </section>
                            <section className={style.Rules}>
                                Legal Information
                                <section className={style.RLinks}>
                                    <a href="/">Политика конфидициальности</a>
                                    <a href="/">Пользовательское соглашение</a>
                                </section>
                            </section>
                            <section className={style.Mail}>
                                Contact Info
                                <section className={style.MLinks}>
                                    <a href="/">mail@mail.ru</a>
                                </section>
                            </section>
                        </section>
                    </section>

                    <section className={style.Info}>
                        <div className={style.Line}></div>
                        <section className={style.Footer_info}>
                            <div className={style.Footer_txt}>© 2025 Avis. Все права защищены</div>
                            <section className={style.Cockie}>
                                <div>Настройки Куки</div>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </>
    )
}