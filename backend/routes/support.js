const express = require('express');
const router = express.Router();
const db = require('../database');

// здеся соо отправляются
router.post('/send', (req, res) => {
    const { userId, text } = req.body;
    db.prepare('INSERT INTO messages (userId, text) VALUES (?, ?)').run(userId, text);
    res.json({ message: 'Обращение отправлено' });
});

// тута соо получаеца
router.get('/my/:userId', (req, res) => {
    const messages = db.prepare('SELECT * FROM messages WHERE userId = ? ORDER BY createdAt DESC').all(req.params.userId);
    res.json(messages);
});

module.exports = router;