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
    const { name, email, title, status } = req.body;
    if (!req.file) {
        return res.status(400).json({ message: 'Image is required for new board members' });
    }
    const imagePath = req.file.path;
  
    const query = 'INSERT INTO board (name, email, title, image, status) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, email, title, imagePath, status], (err, result) => {
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

router.get('/presidents', (req, res) => {
    db.query(`SELECT * FROM president ORDER BY status DESC`, (err, results) => {
        if (err) {
            console.error("Error retrieving presidents:", err);
            return res.status(500).json({ message: 'Error retrieving presidents.' });
        }
        const activePresident = results.find(president => president.status === 'active');
        const formerPresidents = results.filter(president => president.status === 'inactive');
        res.json({ activePresident, formerPresidents });
    });
});

router.post('/presidents', upload.single('image'), (req, res) => {
    const { name, description, status } = req.body;
    const imagePath = req.file ? req.file.path : null;

    db.beginTransaction((err) => {
        if (err) return handleTransactionError(err, res, db, 'Transaction initiation failed.');

        const updateQuery = status === 'active'
            ? `UPDATE president SET status = 'inactive' WHERE status = 'active'`
            : null;

        const insertNewPresident = () => {
            db.query(
                `INSERT INTO president (name, description, image, status) VALUES (?, ?, ?, ?)`,
                [name, description, imagePath, status || 'inactive'],
                (insertErr) => {
                    if (insertErr) return handleTransactionError(insertErr, res, db, 'Error inserting new president.');
                    db.commit((commitErr) => {
                        if (commitErr) return handleTransactionError(commitErr, res, db, 'Commit failed.');
                        res.json({ message: 'New president added successfully.' });
                    });
                }
            );
        };

        updateQuery ? db.query(updateQuery, (updateErr) => updateErr ? handleTransactionError(updateErr, res, db, 'Error updating current president.') : insertNewPresident()) : insertNewPresident();
    });
});

router.put('/presidents/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const imagePath = req.file ? req.file.path : undefined;

    db.beginTransaction((err) => {
        if (err) return handleTransactionError(err, res, db, 'Transaction initiation failed.');

        const updateFields = [];
        const values = [];

        if (name) updateFields.push("name = ?"), values.push(name);
        if (description) updateFields.push("description = ?"), values.push(description);
        if (imagePath) updateFields.push("image = ?"), values.push(imagePath);
        if (status) updateFields.push("status = ?"), values.push(status);
        values.push(id);

        const deleteOldImageAndUpdate = () => {
            db.query('SELECT image FROM president WHERE id = ?', [id], (err, results) => {
                if (err) return handleTransactionError(err, res, db, 'Error retrieving old image.');

                const oldImagePath = results[0]?.image;
                const fullExistingImagePath = path.join(__dirname, '../', oldImagePath);
                if (fullExistingImagePath && imagePath) {
                    fs.unlink(path.resolve(fullExistingImagePath), (err) => {
                        if (err) console.error('Failed to delete old image:', err);
                    });
                }

                updatePresident();
            });
        };

        const updatePresident = () => {
            db.query(`UPDATE president SET ${updateFields.join(", ")} WHERE id = ?`, values, (err) => {
                if (err) return handleTransactionError(err, res, db, 'Error updating president.');
                db.commit((err) => {
                    if (err) return handleTransactionError(err, res, db, 'Commit failed.');
                    res.json({ message: 'President updated successfully.' });
                });
            });
        };

        if (status === 'active') {
            db.query(`UPDATE president SET status = 'inactive' WHERE status = 'active' AND id != ?`, [id], (err) => {
                if (err) return handleTransactionError(err, res, db, 'Error updating active status.');
                deleteOldImageAndUpdate();
            });
        } else {
            deleteOldImageAndUpdate();
        }
    });
});

router.delete('/presidents/:id', (req, res) => {
    const { id } = req.params;

    db.query(`SELECT image FROM president WHERE id = ?`, [id], (err, results) => {
        if (err) {
            console.error("Error retrieving president image:", err);
            return res.status(500).json({ message: 'Error retrieving president image.' });
        }

        const imagePath = results[0]?.image;
        const fullExistingImagePath = path.join(__dirname, '../', imagePath);

        db.query(`DELETE FROM president WHERE id = ?`, [id], (err) => {
            if (err) {
                console.error("Error deleting president:", err);
                return res.status(500).json({ message: 'Error deleting president.' });
            }

            if (fullExistingImagePath) {
                fs.unlink(path.resolve(fullExistingImagePath), (err) => {
                    if (err) console.error("Failed to delete president's image:", err);
                });
            }

            res.json({ message: 'President deleted successfully.' });
        });
    });
});

router.get('/management-committee', (req, res) => {
    const query = 'SELECT * FROM management_committee';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);

        const activeMembers = results.filter(member => member.status === 'active');
        const inactiveMembers = results.filter(member => member.status === 'inactive');
        
        res.json({ active: activeMembers, inactive: inactiveMembers });
    });
});

router.post('/management-committee', upload.single('image'), (req, res) => {
    const { name, email, title, status } = req.body;
    if (!req.file) {
        return res.status(400).json({ message: 'Image is required for new committee members' });
    }
    const imagePath = req.file.path;
  
    const query = 'INSERT INTO management_committee (name, email, title, image, status) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, email, title, imagePath, status], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Committee member added successfully!', userId: result.insertId });
    });
});

router.put('/management-committee/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { name, email, title, status } = req.body;

    const selectQuery = `SELECT image FROM management_committee WHERE id = ?`;
    db.query(selectQuery, [id], (err, results) => {
        if (err) return res.status(500).send({ error: 'Database query error', details: err });
        if (results.length === 0) return res.status(404).json({ message: 'Committee member not found' });

        const existingImage = results[0].image;
        let imagePath = existingImage;

        if (req.file) {
            const fullExistingImagePath = path.join(__dirname, '../', existingImage);
            if (existingImage && fs.existsSync(fullExistingImagePath)) {
                fs.unlinkSync(fullExistingImagePath);
            }
            imagePath = req.file.path;
        }

        const updateQuery = `UPDATE management_committee SET name = ?, email = ?, title = ?, image = ?, status = ? WHERE id = ?`;
        db.query(updateQuery, [name, email, title, imagePath, status, id], (err, result) => {
            if (err) return res.status(500).send({ error: 'Database update error', details: err });
            res.json({ message: 'Committee member updated successfully' });
        });
    });
});

router.delete('/management-committee/:id', (req, res) => {
    const { id } = req.params;

    const selectQuery = `SELECT image FROM management_committee WHERE id = ?`;
    db.query(selectQuery, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).json({ message: 'Committee member not found' });

        const image = results[0].image;
        const fullExistingImagePath = path.join(__dirname, '../', image);

        if (image && fs.existsSync(fullExistingImagePath)) {
            fs.unlinkSync(fullExistingImagePath);
        }

        const deleteQuery = `DELETE FROM management_committee WHERE id = ?`;
        db.query(deleteQuery, [id], (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ message: 'Committee member deleted successfully' });
        });
    });
});

router.get('/dc-offices', (req, res) => {
    const query = 'SELECT * FROM director_offices';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);

        const activeOffices = results.filter(office => office.status === 'active');
        const inactiveOffices = results.filter(office => office.status === 'inactive');
        
        res.json({ active: activeOffices, inactive: inactiveOffices });
    });
});

router.post('/dc-offices', (req, res) => {
    const { office_name, status } = req.body;

    if (!office_name || !status) {
        return res.status(400).json({ error: 'Office name and status are required' });
    }

    const query = 'INSERT INTO director_offices (office_name, status) VALUES (?, ?)';
    
    db.query(query, [office_name, status], (error, result) => {
        if (error) {
            console.error("Error adding new office:", error);
            return res.status(500).json({ error: 'Error adding new office' });
        }
        res.status(201).json({ message: 'New office added successfully', id: result.insertId });
    });
});

router.put('/dc-offices/:id', async (req, res) => {
    const { id } = req.params;
    const { office_name, status } = req.body;
    try {
        const [result] = await db.promise().query(
            'UPDATE director_offices SET office_name = ?, status = ? WHERE id = ?',
            [office_name, status, id]
        );

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Office not found' });
        } else {
            res.json({ message: 'Office updated successfully' });
        }
    } catch (error) {
        console.error("Error updating office:", error);
        res.status(500).json({ message: 'Failed to update office' });
    }
});

router.delete('/dc-offices/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.promise().query('DELETE FROM director_offices WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Office not found' });
        } else {
            res.json({ message: 'Office deleted successfully' });
        }
    } catch (error) {
        console.error("Error deleting office:", error);
        res.status(500).json({ message: 'Failed to delete office' });
    }
});

router.get('/dc-members', async (req, res) => {
    const { office_id } = req.query;

    if (!office_id) {
        return res.status(400).json({ message: 'Office ID is required' });
    }

    try {
        const [activeMembers] = await db.promise().query(
            'SELECT id, name, title, email, status, image FROM directors WHERE office_id = ? AND status = ?',
            [office_id, 'active']
        );

        const [inactiveMembers] = await db.promise().query(
            'SELECT id, name, title, email, status, image FROM directors WHERE office_id = ? AND status = ?',
            [office_id, 'inactive']
        );

        res.json({
            active: activeMembers,
            inactive: inactiveMembers,
        });
    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).json({ message: 'Failed to fetch members' });
    }
});

router.post('/dc-members', upload.single('image'), (req, res) => {
    const { name, title, email, status, office_id } = req.body;
    const image = req.file ? req.file.path : null;

    const sql = 'INSERT INTO directors (name, title, email, status, office_id, image) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, title, email, status, office_id, image], (err, result) => {
        if (err) {
            console.error('Error adding member:', err);
            return res.status(500).json({ message: 'Failed to add member' });
        }
        res.json({ message: 'Member added successfully' });
    });
});

router.put('/dc-members/:id', upload.single('image'), (req, res) => {
    const memberId = req.params.id;
    const { name, title, email, status } = req.body;
    const newImage = req.file ? req.file.filename : null;

    const getMemberSql = 'SELECT image FROM directors WHERE id = ?';
    db.query(getMemberSql, [memberId], (err, results) => {
        if (err || results.length === 0) {
            console.error('Error finding member:', err);
            return res.status(404).json({ message: 'Member not found' });
        }

        const oldImage = results[0].image;

        const updateSql = 'UPDATE directors SET name = ?, title = ?, email = ?, status = ?, image = ? WHERE id = ?';
        db.query(updateSql, [name, title, email, status, newImage || oldImage, memberId], (err) => {
            if (err) {
                console.error('Error updating member:', err);
                return res.status(500).json({ message: 'Failed to update member' });
            }

            if (newImage && oldImage) {
                const oldImagePath = path.join(__dirname, '../', oldImage);
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.error('Error deleting old image:', err);
                });
            }

            res.json({ message: 'Member updated successfully' });
        });
    });
});

router.delete('/dc-members/:id', (req, res) => {
    const memberId = req.params.id;

    const getMemberSql = 'SELECT image FROM directors WHERE id = ?';
    db.query(getMemberSql, [memberId], (err, results) => {
        if (err || results.length === 0) {
            console.error('Error finding member:', err);
            return res.status(404).json({ message: 'Member not found' });
        }

        const image = results[0].image;
        const deleteSql = 'DELETE FROM directors WHERE id = ?';
        console.log(image)

        db.query(deleteSql, [memberId], (err) => {
            if (err) {
                console.error('Error deleting member:', err);
                return res.status(500).json({ message: 'Failed to delete member' });
            }

            if (image) {
                const imagePath = path.join(__dirname, '../', image);
                fs.unlink(imagePath, (err) => {
                    if (err) console.error('Error deleting image:', err);
                });
            }

            res.json({ message: 'Member deleted successfully' });
        });
    });
});

module.exports = router;