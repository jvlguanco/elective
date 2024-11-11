require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(401).json({ message: 'User not found' });
    
        const user = results[0];
        // if (user.password === password) {
        //     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_TOKEN, { expiresIn: '1h' });
        //     res.json({ token, role: user.role });
        // } else {
        //     res.status(401).json({ message: 'Invalid credentials' });
        // }
        
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).send(err);
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_TOKEN, { expiresIn: '1h' });
            res.json({ token, role: user.role });
        });
    });
});

module.exports = router;