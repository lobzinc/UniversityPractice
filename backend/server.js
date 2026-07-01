const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./database');

const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const storesRouter = require('./routes/stores');
const infoRouter = require('./routes/info');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/stores', storesRouter);
app.use('/api/info', infoRouter);

// регистрация вот тут
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    const userExists = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (userExists) {
        return res.status(400).json({ message: "Такой пользователь уже есть в системе!" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, hashedPassword);

    console.log('Новый пользователь:', username);
    res.json({ message: "Регистрация успешна!" });
});

// ВХОД
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (!user) {
        return res.status(401).json({ message: "Неверный логин или пароль" });
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
        return res.status(401).json({ message: "Неверный логин или пароль" });
    }

    res.json({
        id: user.id,
        username: user.username,
        role: user.role,
        message: `Добро пожаловать, ${username}!`
    });
});

// отправить соо
app.post('/api/support/send', (req, res) => {
    const { userId, text } = req.body;

    db.prepare('INSERT INTO messages (userId, text) VALUES (?, ?)').run(userId, text);

    res.json({ message: "Обращение отправлено" });
});

// получить соо пользователя
app.get('/api/support/my/:userId', (req, res) => {
    const messages = db.prepare(
        'SELECT * FROM messages WHERE userId = ? ORDER BY createdAt DESC'
    ).all(req.params.userId);

    res.json(messages);
});

// админ получает все все сообщения
app.get('/api/support/all', (req, res) => {
    const messages = db.prepare(`
        SELECT messages.*, users.username 
        FROM messages 
        JOIN users ON messages.userId = users.id 
        ORDER BY messages.createdAt DESC
    `).all();

    res.json(messages);
});

// ответ на обращенияя
app.put('/api/support/reply/:id', (req, res) => {
    const { reply } = req.body;

    db.prepare('UPDATE messages SET reply = ?, status = ? WHERE id = ?').run(reply, 'closed', req.params.id);

    res.json({ message: "Ответ отправлен" });
});

// тут админ удаляет обращения
app.delete('/api/support/:id', (req, res) => {
    db.prepare('DELETE FROM messages WHERE id = ?').run(req.params.id);
    res.json({ message: "Обращение удалено" });
});

// если кто-то все таки не послушает меня, и несет бд, тут админ занаво создается
const adminExists = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
if (!adminExists) {
    const hash = bcrypt.hashSync('admin', 10);
    db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run('admin', hash, 'admin');
    console.log('Админ создан: admin / admin');
}

// на случай тестов
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Что-то пошло не так!' });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});