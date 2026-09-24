import React, { useState } from 'react';
import styles from './DialogWindow.module.css';

export default function DialogWindow({ messages, onClose, onSend }) {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim() === '') return;
        onSend(text);
        setText('');
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.window}>
                <div className={styles.header}>
                    <h3>Диалог</h3>
                    <button className={styles.close} onClick={onClose}>×</button>
                </div>

                <div className={styles.messages}>
                    {messages.map((msg, index) => (
                        <div key={index} className={styles.message}>
                            <p className={styles.author}>{msg.author}</p>
                            <p className={styles.text}>{msg.text}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.inputBlock}>
                    <input 
                        type="text" 
                        value={text} 
                        onChange={(e) => setText(e.target.value)} 
                        placeholder="Введите сообщение..."
                    />
                    <button onClick={handleSend}>Отправить</button>
                </div>
            </div>
        </div>
    );
}
