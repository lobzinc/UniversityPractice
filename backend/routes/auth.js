const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database');

// Регистрация
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    const existingUser = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (existingUser) {
        return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, hashedPassword);

    res.json({ message: 'Регистрация успешна' });
});

// салтанат здесь кароче вход ниче не ломай тут пж
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (!user) {
        return res.status(400).json({ message: 'Неверный логин или пароль' });
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
        return res.status(400).json({ message: 'Неверный логин или пароль' });
    }

    res.json({
        id: user.id,
        username: user.username,
        role: user.role
    });
});

module.exports = router;