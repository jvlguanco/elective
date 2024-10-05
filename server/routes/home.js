const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/about', (req, res) => {
    const query = 'SELECT * FROM about_home ORDER BY id ASC LIMIT 1';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    });
});

router.put('/about', (req, res) => {
    const { content } = req.body;
    const query = 'UPDATE about_home SET message = ? WHERE id = 1';
    db.query(query, [content], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Paragraph updated successfully.' });
    });
});


module.exports = router;