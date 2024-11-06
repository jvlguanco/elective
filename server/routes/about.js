const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../db');
const upload = require('../storage');
const path = require('path');

router.get('/board-of-regents', (req, res) => {
    const query = 'SELECT * FROM board';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
    
        const activeMembers = results.filter(member => member.status === 'active');
        const inactiveMembers = results.filter(member => member.status === 'inactive');
        
        res.json({ active: activeMembers, inactive: inactiveMembers });
    });
});

router.post('/board-of-regents', upload.single('image'), (req, res) => {
    const { name, email, title } = req.body;
    if (!req.file) {
        return res.status(400).json({ message: 'Image is required for new board members' });
    }
    const imagePath = req.file.path;
  
    const query = 'INSERT INTO board (name, email, title, image) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, title, imagePath], (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'User added successfully!', userId: result.insertId });
    });
});

router.put('/board-of-regents/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { name, email, title, status } = req.body;

    const selectQuery = `SELECT image FROM board WHERE id = ?`;
    db.query(selectQuery, [id], (err, results) => {
        if (err) return res.status(500).send({ error: 'Database query error', details: err });
        if (results.length === 0) return res.status(404).json({ message: 'Board member not found' });

        const existingImage = results[0].image;
        let imagePath = existingImage;

        if (req.file) {
            const fullExistingImagePath = path.join(__dirname, '../', existingImage);
            if (existingImage && fs.existsSync(fullExistingImagePath)) {
                fs.unlinkSync(fullExistingImagePath);
            }
            imagePath = req.file.path;
        }

        const updateQuery = `UPDATE board SET name = ?, email = ?, title = ?, image = ?, status = ? WHERE id = ?`;
        db.query(updateQuery, [name, email, title, imagePath, status, id], (err, result) => {
            if (err) return res.status(500).send({ error: 'Database update error', details: err });
            res.json({ message: 'Board member updated successfully' });
        });
    });
});

router.delete('/board-of-regents/:id', (req, res) => {
    const { id } = req.params;

    const selectQuery = `SELECT image FROM board WHERE id = ?`;
    db.query(selectQuery, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).json({ message: 'Board member not found' });

        const image = results[0].image;
        const fullExistingImagePath = path.join(__dirname, '../', image);

        if (image && fs.existsSync(fullExistingImagePath)) {
            fs.unlinkSync(image);
        }

        const deleteQuery = `DELETE FROM board WHERE id = ?`;
        db.query(deleteQuery, [id], (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ message: 'Board member deleted successfully' });
        });
    });
});


module.exports = router;