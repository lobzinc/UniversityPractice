import { useState, useEffect, useCallback } from 'react';
import './Profile.css';

function Profile({ user, onLogout }) {
    const [messages, setMessages] = useState([]);
    const [allMessages, setAllMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [replyText, setReplyText] = useState({});
    const [activeTab, setActiveTab] = useState('my');

    const isAdmin = user.role === 'admin';

    const fetchMyMessages = useCallback(async () => {
        const res = await fetch(`http://localhost:5002/api/support/my/${user.id}`);
        const data = await res.json();
        setMessages(data);
    }, [user.id]); // зависимость от user.id

    const fetchAllMessages = useCallback(async () => {
        const res = await fetch('http://localhost:5002/api/support/all');
        const data = await res.json();
        setAllMessages(data);
    }, []);

    useEffect(() => {
        if (isAdmin) {
            fetchAllMessages();
        } else {
            fetchMyMessages();
        }
    }, [isAdmin, fetchMyMessages, fetchAllMessages]);

    const handleSend = async () => {
        if (!newMessage.trim()) return;

        await fetch('http://localhost:5002/api/support/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id, text: newMessage })
        });

        setNewMessage('');
        fetchMyMessages();
    };

    const handleReply = async (messageId) => {
        const reply = replyText[messageId];
        if (!reply || !reply.trim()) return;

        await fetch(`http://localhost:5002/api/support/reply/${messageId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reply })
        });

        setReplyText({ ...replyText, [messageId]: '' });
        fetchAllMessages();
    };

    const handleDelete = async (messageId) => {
        await fetch(`http://localhost:5002/api/support/${messageId}`, {
            method: 'DELETE'
        });
        fetchAllMessages();
    };

    const openCount = allMessages.filter(m => m.status === 'open').length;
    const closedCount = allMessages.filter(m => m.status === 'closed').length;

    return (
        <div className="profile-page">
            <div className="profile-card">
                <h2>Личный кабинет</h2>
                <p>Добро пожаловать, <strong>{user.username}</strong></p>
                <p>Статус: <strong>{isAdmin ? 'Администратор' : 'Пользователь'}</strong></p>

                <button className="btn-logout" onClick={onLogout}>Выйти</button>

                {/* вкладки для админа */}
                {isAdmin && (
                    <div className="admin-tabs">
                        <button
                            className={activeTab === 'my' ? 'active' : ''}
                            onClick={() => setActiveTab('my')}
                        >
                            Мои обращения ({messages.length})
                        </button>
                        <button
                            className={activeTab === 'all' ? 'active' : ''}
                            onClick={() => setActiveTab('all')}
                        >
                            Все обращения ({allMessages.length})
                        </button>
                        <div className="admin-stats">
                            <span className="stat-open">🟡 Открыто: {openCount}</span>
                            <span className="stat-closed">🟢 Закрыто: {closedCount}</span>
                        </div>
                    </div>
                )}

                {/* форма отправки для всех */}
                <div className="support-section">
                    <h3>Новое обращение</h3>
                    <div className="new-message">
                        <textarea
                            placeholder="Опишите проблему..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button onClick={handleSend}>Отправить</button>
                    </div>
                </div>

                {/* мои обращения */}
                {(!isAdmin || activeTab === 'my') && (
                    <div className="support-section">
                        <h3>Мои обращения</h3>
                        <div className="messages-list">
                            {messages.length === 0 && <p>Обращений пока нет</p>}
                            {messages.map(msg => (
                                <div key={msg.id} className={`message ${msg.status}`}>
                                    <p className="message-text">{msg.text}</p>
                                    <p className="message-date">{new Date(msg.createdAt).toLocaleString()}</p>
                                    <span className="message-status">
                                        {msg.status === 'open' ? '🟡 В обработке' : '🟢 Решено'}
                                    </span>
                                    {msg.reply && (
                                        <div className="message-reply">
                                            <strong>Ответ поддержки:</strong>
                                            <p>{msg.reply}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* все обращения для админа */}
                {isAdmin && activeTab === 'all' && (
                    <div className="support-section">
                        <h3>Все обращения пользователей</h3>
                        <div className="messages-list">
                            {allMessages.length === 0 && <p>Обращений нет</p>}
                            {allMessages.map(msg => (
                                <div key={msg.id} className={`message ${msg.status}`}>
                                    <p className="message-user"><strong>{msg.username}</strong></p>
                                    <p className="message-text">{msg.text}</p>
                                    <p className="message-date">{new Date(msg.createdAt).toLocaleString()}</p>
                                    <span className="message-status">
                                        {msg.status === 'open' ? '🟡 В обработке' : '🟢 Решено'}
                                    </span>

                                    {msg.reply && (
                                        <div className="message-reply">
                                            <strong>Ответ:</strong>
                                            <p>{msg.reply}</p>
                                        </div>
                                    )}

                                    {msg.status === 'open' && (
                                        <div className="admin-reply">
                                            <textarea
                                                placeholder="Ответить..."
                                                value={replyText[msg.id] || ''}
                                                onChange={(e) => setReplyText({ ...replyText, [msg.id]: e.target.value })}
                                            />
                                            <button onClick={() => handleReply(msg.id)}>Ответить</button>
                                        </div>
                                    )}

                                    <button className="btn-delete" onClick={() => handleDelete(msg.id)}>Удалить</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;