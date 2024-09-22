const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.get('/about', (req, res) => {
        const query = 'SELECT * FROM about_home ORDER BY id ASC LIMIT 1';
        db.query(query, (err, result) => {
            if (err) {
                console.error("SQL Error:", err);
                return res.status(500).send(err);
            }
            res.json(result);
        });
    });

    return router;
};