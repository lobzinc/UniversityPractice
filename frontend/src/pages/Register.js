import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import API_URL from '../api';

function Register({ onLogin }) {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLoginMode ? "/api/login" : "/api/register";

    try {
      const response = await fetch(`${API_URL}` + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      setStatus(data.message);

      if (response.ok && isLoginMode) {
        // сохранить пользователя в бд тут, ниче не трогать не ломать
        const userData = {
          id: data.id,
          username: data.username || username,
          role: data.role || 'user'
        };
        onLogin(userData);
        navigate('/profile');
      }
    } catch (err) {
      setStatus("Проблемы со связью...");
    }
  };

  return (
      <div className="register-page">
        <div className="register-card">
          <h2>{isLoginMode ? "Вход в аккаунт" : "Регистрация"}</h2>

          <form onSubmit={handleSubmit} className="reg-form">
            <input
                placeholder="Ваш никнейм"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" className="btn-red">
              {isLoginMode ? "Войти" : "Зарегистрироваться"}
            </button>
          </form>

          <p className="status-msg">{status}</p>

          <button
              className="btn-switch"
              onClick={() => { setIsLoginMode(!isLoginMode); setStatus(""); }}
          >
            {isLoginMode ? "Нет аккаунта? Создать" : "Уже зарегистрирован? Войти"}
          </button>
        </div>
      </div>
  );
}

export default Register;