const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../db');
const upload = require('../storage');
const path = require('path');

router.post('/create', upload.single('pdfFile'), (req, res) => {
    const { jobTitle, jobPosition, minSalary, maxSalary, department } = req.body;
    const pdfFile = req.file;
  
    if (!pdfFile) {
      return res.status(400).json({ message: 'PDF file is required' });
    }
  
    const sql = 'INSERT INTO career (title, position, min_salary, max_salary, department, file) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [jobTitle, jobPosition, minSalary, maxSalary, department, pdfFile.path];

    db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error inserting data into MySQL:', err);
          return res.status(500).json({ message: 'Failed to save data to the database' });
        }
        res.status(200).json({ message: 'Form submitted and data saved successfully!' });
    });
});

router.get('/all', (req, res) => {
    const sql = 'SELECT * FROM career ORDER BY id DESC';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error retrieving data from MySQL:', err);
            return res.status(500).json({ message: 'Failed to retrieve data' });
        }
        res.status(200).json(result);
    });
});

router.put('/update/:id', upload.single('pdfFile'), (req, res) => {
    const { id } = req.params;
    const { jobTitle, jobPosition, minSalary, maxSalary, department } = req.body;
    const pdfFile = req.file;
    
    const selectSql = 'SELECT file FROM career WHERE id = ?';

    db.query(selectSql, [id], (selectErr, results) => {
        if (selectErr) {
            console.error('Error fetching old file data:', selectErr);
            return res.status(500).json({ message: 'Error fetching the current record' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Career listing not found' });
        }

        const oldFilePath = results[0].file;

        let sql = '';
        let values = [];

        if (pdfFile) {
            sql = 'UPDATE career SET title = ?, position = ?, min_salary = ?, max_salary = ?, department = ?, file = ? WHERE id = ?';
            values = [jobTitle, jobPosition, minSalary, maxSalary, department, pdfFile.path, id];

            if (oldFilePath) {
                fs.unlink(oldFilePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error('Error deleting old file:', unlinkErr);
                    } else {
                        console.log('Old file deleted:', oldFilePath);
                    }
                });
            }
        } else {
            sql = 'UPDATE career SET title = ?, position = ?, min_salary = ?, max_salary = ?, department = ? WHERE id = ?';
            values = [jobTitle, jobPosition, minSalary, maxSalary, department, id];
        }

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error updating data in MySQL:', err);
                return res.status(500).json({ message: 'Failed to update the career listing' });
            }
            res.status(200).json({ message: 'Career listing updated successfully' });
        });
    });
});

router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM career WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting data from MySQL:', err);
            return res.status(500).json({ message: 'Failed to delete the career listing' });
        }
        res.status(200).json({ message: 'Career listing deleted successfully' });
    });
});

module.exports = router;