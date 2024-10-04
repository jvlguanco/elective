const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/home', (req, res) => {
    const query = 'SELECT * FROM about_home ORDER BY id ASC LIMIT 1';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    });
});

module.exports = router;