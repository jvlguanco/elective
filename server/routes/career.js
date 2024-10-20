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

module.exports = router;