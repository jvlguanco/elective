const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../db');
const upload = require('../storage');
const path = require('path');
const defaultLocation = 'downloads';

router.get('/downloads', (req, res) => {
    const location = defaultLocation;
    const sql = 'SELECT * FROM files WHERE location = ?';
    db.query(sql, [location], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching downloads' });
        }
        res.json(results);
    });
});

router.get('/sections', (req, res) => {
    const sql = 'SELECT DISTINCT section FROM files WHERE location = ?';
    db.query(sql, [defaultLocation], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching sections' });
        }
        res.json(results);
    });
});

router.post('/downloads', upload.single('file'), (req, res) => {
    const { title, section } = req.body;
    const file_path = req.file ? req.file.path : null;

    if (!title || !section || !file_path) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const sql = 'INSERT INTO files (location, file_path, title, section) VALUES (?, ?, ?, ?)';
    db.query(sql, [defaultLocation, file_path, title, section], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error adding download' });
        }
        res.json({ message: 'Download added successfully', id: result.insertId });
    });
});

router.put('/downloads/:id', upload.single('file'), (req, res) => {
    const { id } = req.params;
    const { title, section } = req.body;
    const file_path = req.file ? req.file.path : null;

    if (!title || !section) {
        return res.status(400).json({ message: 'Title and section are required' });
    }

    const sqlSelect = 'SELECT file_path FROM files WHERE id = ?';
    db.query(sqlSelect, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching existing file path' });
        }

        const currentFilePath = results[0]?.file_path;

        let sql = 'UPDATE files SET title = ?, section = ?';
        const params = [title, section];

        if (file_path) {
            sql += ', file_path = ?';
            params.push(file_path);
        }

        sql += ' WHERE id = ?';
        params.push(id);

        db.query(sql, params, (updateErr) => {
            if (updateErr) {
                console.error(updateErr);
                return res.status(500).json({ message: 'Error updating download' });
            }

            if (file_path && currentFilePath) {
                fs.unlink(currentFilePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error('Error deleting old file:', unlinkErr);
                    }
                });
            }

            res.json({ message: 'Download updated successfully' });
        });
    });
});

router.delete('/downloads/:id', (req, res) => {
    const { id } = req.params;

    const sqlSelect = 'SELECT file_path FROM files WHERE id = ?';
    db.query(sqlSelect, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching file path for deletion' });
        }

        const currentFilePath = results[0]?.file_path;

        const sqlDelete = 'DELETE FROM files WHERE id = ?';
        db.query(sqlDelete, [id], (deleteErr) => {
            if (deleteErr) {
                console.error(deleteErr);
                return res.status(500).json({ message: 'Error deleting download' });
            }

            if (currentFilePath) {
                fs.unlink(currentFilePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error('Error deleting file:', unlinkErr);
                    }
                });
            }

            res.json({ message: 'Download deleted successfully' });
        });
    });
});

router.get('/partner', (req, res) => {
    db.query('SELECT * FROM partner LIMIT 1', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Partner not found.' });
        }
        res.json(results[0]);
    });
});

router.put('/partner', (req, res) => {
    const { description, individuals, providers, how, who, title } = req.body;

    const updateQuery = `
        UPDATE partner 
        SET description = ?, individuals = ?, providers = ?, how = ?, who = ?, title = ?
        LIMIT 1
    `;
    db.query(updateQuery, [description, individuals, providers, how, who, title], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error.' });
        }
        res.json({ message: 'Partner updated successfully.' });
    });
});

router.get('/policy', (req, res) => {
    db.query('SELECT * FROM privacy_policy LIMIT 1', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Partner not found.' });
        }
        res.json(results[0]);
    });
});

router.put('/policy', (req, res) => {
    const { policy } = req.body;

    const updateQuery = `
        UPDATE privacy_policy 
        SET policy = ?
        LIMIT 1
    `;
    db.query(updateQuery, [policy], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error.' });
        }
        res.json({ message: 'Partner updated successfully.' });
    });
});

module.exports = router;