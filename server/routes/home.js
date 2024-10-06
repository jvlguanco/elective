const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../db');
const upload = require('../storage');
const path = require('path');

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

router.post('/collection', (req, res, next) => {
    const maxFiles = req.query.maxFiles || 4;
    const uploadHandler = upload.array('photos', maxFiles);
    
    uploadHandler(req, res, function (err) {
        if (err) {
            return res.status(400).send('File upload error.');
        }
    
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
    
        const filePaths = req.files.map(file => file.path);
        const location = req.body.location;
    
        if (!location) {
            return res.status(400).send('Location is required.');
        }
    
        const sql = 'INSERT INTO photos (file_path, location) VALUES ?';
        const values = filePaths.map(path => [path, location]);

        db.query('SELECT file_path FROM photos WHERE location = ?', [location], (err, results) => {
            const sql = 'INSERT INTO photos (file_path, location) VALUES ?';
            const values = filePaths.map(path => [path, location]);

            if (!err) {
                results.forEach((row) => {
                    const oldFilePath = row.file_path;
                    fs.unlink(path.join(__dirname, '..', oldFilePath), (err) => {
                        if (err) {
                            console.error(`Failed to delete file: ${oldFilePath}`);
                        } else {
                            console.log(`Deleted file: ${oldFilePath}`);
                        }
                    });
                });

                db.query('DELETE FROM photos WHERE location = ?', [location], (err) => {
                    if (err) {
                        return res.status(500).send('Failed to delete old records from database.');
                    }

                    db.query(sql, [values], (err) => {
                        if (err) {
                            return res.status(500).send('Failed to save new file paths to database.');
                        }
                        res.status(200).send('Files uploaded successfully');
                    });
                });
            }
            else {
                db.query(sql, [values], (err) => {
                    if (err) {
                        return res.status(500).send('Failed to save new file paths to database.');
                    }
                    res.status(200).send('Files uploaded successfully');
                });
            }
        });
    });
});

router.get('/photos/:location', (req, res) => {
    const location = req.params.location;
  
    const query = `SELECT file_path FROM photos WHERE location = ?`;
    db.query(query, [location], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      res.json(results);
    });
});


module.exports = router;