import React, { useState, useEffect } from 'react'
import style from './TaskProgress.module.css'
import Task from './Task/Task'
import Card from './Card/Card'
import AddSubjectModal from './AddSubjectModal/AddSubjectModal'

export default function TaskProgress({ priority }) {
    const [selectedItem, setSelectedItem] = useState(null)
    const [subjects, setSubjects] = useState([])
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editSubject, setEditSubject] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (showAddModal || showEditModal) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'auto'
    }, [showAddModal, showEditModal])

    async function fetchSubjects() {
        try {
            const res = await fetch('http://localhost:5000/api/subjects')
            if (!res.ok) throw new Error('Ошибка загрузки предметов')
            const data = await res.json()
            setSubjects(data)
            setLoading(false)
        } catch (error) {
            alert(error.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSubjects()
    }, [])

    function handleCardClick(item) {
        setSelectedItem(item)
    }

    function handleBackClick() {
        setSelectedItem(null)
    }

    function openAddModal() {
        setShowAddModal(true)
    }

    function closeAddModal() {
        setShowAddModal(false)
    }

    function openEditModal(subject) {
        setEditSubject(subject)
        setShowEditModal(true)
    }

    function closeEditModal() {
        setShowEditModal(false)
        setEditSubject(null)
    }

    async function handleAddSubject(newSubject) {
        try {
            const res = await fetch('http://localhost:5000/api/subjects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSubject),
            })
            if (!res.ok) throw new Error('Ошибка при добавлении предмета')
            await res.json()
            await fetchSubjects()
            closeAddModal()
        } catch (error) {
            alert(error.message)
        }
    }

    async function handleDeleteSubject(id) {
        try {
            const res = await fetch(`http://localhost:5000/api/subjects/${id}`, {
                method: 'DELETE'
            })
            if (!res.ok) throw new Error('Ошибка при удалении предмета')
            await fetchSubjects()
            closeEditModal()
            setSelectedItem(null)
        } catch (error) {
            alert(error.message)
        }
    }

    async function handleEditSubject(updatedSubject) {
        try {
            const res = await fetch(`http://localhost:5000/api/subjects/${updatedSubject.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedSubject),
            });
            console.log('Response status:', res.status);
            if (!res.ok) throw new Error('Ошибка при обновлении предмета')
            const updated = await res.json()
            console.log('Updated from server:', updated)
            await fetchSubjects()
            closeEditModal()
        } catch (error) {
            alert(error.message)
        }
    }

    if (loading) return <p>Загрузка...</p>

    if (selectedItem) {
        return (
            <section className={style.Window}>
                <Task onClick={handleBackClick} item={selectedItem} priority={priority} onUpdate={handleEditSubject} onOpenEditModal={() => setShowEditModal(true)} onCloseEditModal={() => setShowEditModal(false)} showEditModal={showEditModal} editSubject={editSubject} setEditSubject={setEditSubject} onDeleteSubject={handleDeleteSubject}/>
            </section>
        )
    }

    return (
        <>
            <section className={style.Cards}>
                {subjects.map((item) => (
                    <Card key={item.id} src={item.image_path || '/card_task/default.png'} header={item.name} ready={item.ready || 0} task={item.max_tasks} color={item.color} hard_deadline={item.hard_deadline} soft_deadline={item.soft_deadline} onClick={() => handleCardClick(item)} />
                ))}

                {priority === 1 && (
                    <div className={style.Add_card} onClick={openAddModal}>
                        <div className={style.Add_btn}>
                            <img src="/card_task/add.svg" alt="" />
                            <p>Добавить предмет</p>
                        </div>
                        <p className={style.Click}>Кликабельно</p>
                    </div>
                )}
            </section>

            {showAddModal && (
                <AddSubjectModal onClose={closeAddModal} onAdd={handleAddSubject} />
            )}
        </>
    )
}