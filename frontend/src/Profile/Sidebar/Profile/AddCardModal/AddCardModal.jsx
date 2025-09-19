import React, { useState, useEffect } from 'react';
import style from './AddCardModal.module.css';

export default function AddCardModal({ isOpen, onClose, cardData, onSave, cardType }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: '',
        status: '',
        year: '',
    });
    useEffect(() => {
        if (cardData) {
            setFormData({
                title: cardData.title || '',
                description: cardData.description || '',
                type: cardData.type || '',
                status: cardData.status || '',
                year: cardData.year || '',
            });
        } else {
            setFormData({
                title: '',
                description: '',
                type: '',
                status: '',
                year: '',
            });
        }
    }, [cardData]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const renderTitle = cardType === 'portfolio' ? 'проект' : 'достижение';  

    const handleClose = () => {
        setFormData({
            title: '',
            description: '',
            type: '',
            status: '',
            year: '',
        });
        onClose();
    };

    return (
        isOpen && (
            <div className={style.Modal}>
                <div className={style.ModalWindow}>
                    <p>{cardData ? `Редактировать ${renderTitle}` : `Добавить ${renderTitle}`}</p>
                    <form onSubmit={handleSubmit} className={style.Form} autoComplete="off">
                        <label>
                            Название:
                            <input name="title" value={formData.title} onChange={handleChange} required/>
                        </label>

                        <label>
                            Описание:
                            <textarea name="description" value={formData.description} onChange={handleChange} required/>
                        </label>

                        <label>
                            Тип:
                            <input name="type" value={formData.type} onChange={handleChange}/>
                        </label>

                        <label>
                            Статус:
                            <input name="status" value={formData.status} onChange={handleChange}/>
                        </label>

                        <label>
                            Год:
                            <input name="year" type="number" value={formData.year} onChange={handleChange}/>
                        </label>

                        <button className={style.Add} type="submit">{cardData ? 'Сохранить изменения' : 'Добавить'}</button>
                        <button className={style.Close} type="button" onClick={handleClose}>Отмена</button>
                    </form>
                </div>
            </div>
        )
    );
}
