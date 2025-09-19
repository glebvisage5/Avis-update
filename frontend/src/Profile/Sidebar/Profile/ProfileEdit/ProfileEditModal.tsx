import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import style from './ProfileEditModal.module.css';

type UserType = {
    login: string;
    email: string;
    position: string;
    name: string;
};

type ProfileType = {
    birthdate: string;
    phone: string;
    study_group: string;
    university: string;
    gender: string;
};

type Props = {
    user?: UserType;
    profile?: ProfileType;
    priority: number;
    onSave: (data: { user: UserType; profile: ProfileType }) => void;
    onClose: () => void;
};

export default function ProfileEditModal({ user, profile, priority, onSave, onClose }: Props) {
    const [formUser, setFormUser] = useState<UserType>({
        login: '',
        email: '',
        position: '',
        name: '',
    });

    const [formProfile, setFormProfile] = useState<ProfileType>({
        birthdate: '',
        phone: '',
        study_group: '',
        university: '',
        gender: '',
    });

    useEffect(() => {
        if (user) setFormUser(user);

        if (profile) {
            let formattedBirthdate = '';
            if (profile.birthdate) {
                const d = new Date(profile.birthdate);
                if (!isNaN(d.getTime())) {
                    const year = d.getFullYear();
                    const month = String(d.getMonth() + 1).padStart(2, '0');
                    const day = String(d.getDate()).padStart(2, '0');
                    formattedBirthdate = `${year}-${month}-${day}`;
                }
            }
            setFormProfile({
                ...profile,
                birthdate: formattedBirthdate
            });
        }
    }, [user, profile]);


    function handleUserChange(e: ChangeEvent<HTMLInputElement>) {
        setFormUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleProfileChange(e: ChangeEvent<HTMLInputElement>) {
        setFormProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onSave({ user: formUser, profile: formProfile });
    }

    return (
        <section className={style.Model}>
            <div className={style.ModalWindow}>
                <p>Редактировать данные</p>
                <form onSubmit={handleSubmit} className={style.Form} autoComplete="off">
                    <label>
                        ФИО:
                        <input name="name" value={formUser.name || ''} onChange={handleUserChange} required />
                    </label>

                    <label>
                        Логин:
                        <input name="login" value={formUser.login || ''} onChange={handleUserChange} required />
                    </label>

                    <label>
                        Почта:
                        <input name="email" type="email" value={formUser.email || ''} onChange={handleUserChange} required />
                    </label>

                    <label>
                        Статус:
                        <input name="position" value={formUser.position || ''} onChange={handleUserChange} disabled={priority !== 1} />
                    </label>

                    <label>
                        Пол:
                        <input name="gender" value={formProfile.gender || ''} onChange={handleProfileChange} />
                    </label>

                    <label>
                        Дата рождения:
                        <input name="birthdate" type="date" value={formProfile.birthdate || ''} onChange={handleProfileChange} />
                    </label>

                    <label>
                        Телефон:
                        <input name="phone" value={formProfile.phone || ''} onChange={handleProfileChange} />
                    </label>

                    <label>
                        Учебная группа:
                        <input name="study_group" value={formProfile.study_group || ''} onChange={handleProfileChange} />
                    </label>

                    <label>
                        Вуз:
                        <input name="university" value={formProfile.university || ''} onChange={handleProfileChange} />
                    </label>

                    <button className={style.Add} type="submit">Сохранить</button>
                    <button className={style.Close} type="button" onClick={onClose}>Отмена</button>
                </form>
            </div>
        </section>
    );
}
