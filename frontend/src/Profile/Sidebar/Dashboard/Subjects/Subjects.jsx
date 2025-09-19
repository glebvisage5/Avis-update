import style from './Subjects.module.css'

export default function Subjects({subject}) {
    const {id, name, color, max_tasks } = subject;

    let completed_tasks = 0
    if (id === 2) completed_tasks = 5
    else completed_tasks = 6

    const safeMaxTasks = max_tasks > 0 ? max_tasks : 1;
    const progressPercent = Math.min((completed_tasks / safeMaxTasks) * 100, 100);

    return (
        <>
            <section className={style.Subject}>
                <div className={style.Subject_text}>
                    <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        id="Vector"
                        d="M4.01398 8.6558C4.25676 8.33913 4.55232 8.06467 4.82678 7.79022C5.53402 7.15687 6.33626 6.70297 7.01184 6.03795C8.58466 4.4968 8.933 1.95283 7.9302 0C8.933 0.242785 9.80914 0.791689 10.5586 1.39337C13.2926 3.58899 14.3693 7.46299 13.0815 10.7881C13.0392 10.8936 12.997 10.9992 12.997 11.1364C12.997 11.3687 13.1553 11.5798 13.3665 11.6642C13.6092 11.7698 13.8626 11.7064 14.0631 11.5376C14.1231 11.4874 14.1732 11.4265 14.2109 11.3581C15.4037 9.84861 15.5937 7.68466 14.7915 5.9535C16.5543 7.3891 17.5149 9.81695 17.3777 12.1076C17.3144 12.6354 17.251 13.1632 17.0716 13.6909C16.9238 14.3243 16.6388 14.9576 16.3221 15.5171C15.1821 17.3433 13.2081 18.6522 11.0864 18.9161C8.82744 19.2011 6.41015 18.7894 4.67899 17.2272C2.74727 15.4749 2.0717 12.667 3.06395 10.2603L3.20117 9.98584C3.42285 9.50027 4.01398 8.6558 4.01398 8.6558ZM7.34962 15.306C7.64519 15.5593 8.13076 15.8338 8.51077 15.9393C9.69303 16.3616 10.8753 15.7704 11.572 15.0738C10.3158 14.7782 9.56635 13.8493 9.34468 12.9098C9.16523 12.0653 9.50302 11.3687 9.64025 10.5559C9.76692 9.77472 9.7458 9.1097 9.4608 8.38135C9.26023 8.78247 9.04912 9.18359 8.79578 9.50027C7.98298 10.5559 6.70572 11.0203 6.43127 12.4559C6.38904 12.6037 6.36793 12.7515 6.36793 12.9098C6.33626 13.7754 6.71627 14.7254 7.34962 15.306Z"
                        fill={color}
                        fillOpacity={0.65}
                    />
                    </svg>
                    <p>{name}</p>
                </div>

                <div className={style.Subject_progress}>
                    <p>{completed_tasks} / {max_tasks}</p>
                    <div className={style.Back_bar}><div className={style.Bar} style={{ width: `${progressPercent}%`, backgroundColor: color }}></div></div>
                </div>
            </section>
        </>
    )
}
