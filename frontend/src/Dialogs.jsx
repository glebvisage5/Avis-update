import React, { useState } from 'react';
import DialogWindow from './DialogWindow';

export default function Dialogs() {
    const [messages, setMessages] = useState([
        { author: "Иван", text: "Привет!" },
        { author: "Мария", text: "Как дела?" }
    ]);

    const handleSend = (text) => {
        setMessages(prev => [...prev, { author: "Вы", text }]);
    };

    return (
        <div>
            <DialogWindow
                messages={messages}
                onClose={() => {}}
                onSend={handleSend}
            />
        </div>
    );
}
