import style from './Sidebar.module.css'
import Profile from './Profile/Profile'
import Dashboard from './Dashboard/Dashboard'
import TaskProgress from './TaskProgress/TaskProgress'
import Group from './Group/Group'
import Developed from './Developed/Developed'

export default function Sidebar({activeButton, priority, updateUserData}){
    return(
        <div className={style.Sidebar}>
            {activeButton === 'Панель' ? <Dashboard /> : activeButton === 'Профиль' ? <Profile onUpdateProfile={updateUserData}  /> : activeButton === 'Прогресс задач' ? <TaskProgress priority={priority} /> : activeButton === 'Группа' ?  <Group priority={priority} /> : <Developed />}
        </div>
    )
}