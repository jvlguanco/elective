const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../db');
const upload = require('../storage');
const path = require('path');

router.get('/information', (req, res) => {
    const { id } = req.query;
    let sql = 'SELECT * FROM offices';

    if (id) {
        sql += ' WHERE id = ?';
    }

    db.query(sql, id ? [id] : [], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching offices' });
            return;
        }
        res.json(results);
    });
});

router.post('/information', upload.single('org_chart'), (req, res) => {
    const { office_name, description, vision, mission, status, email, contact_number } = req.body;
    const org_chart = req.file ? req.file.path : null;

    const sql = 'INSERT INTO offices (office_name, description, vision, mission, status, org_chart, email, contact_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [office_name, description, vision, mission, status, org_chart, email, contact_number];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error adding office' });
            return;
        }
        res.json({ message: 'Office added successfully', officeId: results.insertId });
    });
});

router.put('/information/:id', upload.single('org_chart'), (req, res) => {
    const { id } = req.params;
    const { office_name, description, vision, mission, status, email, contact_number } = req.body;

    const sqlGet = 'SELECT org_chart FROM offices WHERE id = ?';
    db.query(sqlGet, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving office' });
            return;
        }

        const oldFilePath = results[0]?.org_chart;

        const sqlUpdate = `
            UPDATE offices
            SET office_name = ?, description = ?, vision = ?, mission = ?, status = ?, email = ?, contact_number = ?, org_chart = ?
            WHERE id = ?
        `;
        const org_chart = req.file ? req.file.path : oldFilePath;
        const values = [office_name, description, vision, mission, status, email, contact_number, org_chart, id];

        db.query(sqlUpdate, values, (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error updating office' });
                return;
            }

            if (req.file && oldFilePath) {
                const oldImagePath = path.join(__dirname, '../', oldFilePath);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Error deleting old file:', err);
                    }
                });
            }

            res.json({ message: 'Office updated successfully' });
        });
    });
});

router.delete('/information/:id', (req, res) => {
    const { id } = req.params;

    const sqlGet = 'SELECT org_chart FROM offices WHERE id = ?';
    db.query(sqlGet, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving office' });
            return;
        }

        const oldFilePath = results[0]?.org_chart;

        const sqlDelete = 'DELETE FROM offices WHERE id = ?';
        db.query(sqlDelete, [id], (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error deleting office' });
                return;
            }

            if (oldFilePath) {
                const oldImagePath = path.join(__dirname, '../', oldFilePath);

                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    }
                });
            }

            res.json({ message: 'Office deleted successfully' });
        });
    });
});

module.exports = router;