const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../db');
const upload = require('../storage');
const path = require('path');

router.get('/check-time-post', (req, res) => {
    const query = "SELECT post_id FROM posts WHERE type = 'time-restricted' AND end_date > CURRENT_DATE ORDER BY id DESC LIMIT 1"
  
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query:', error.stack);
        return res.status(500).send('Error executing query');
      }
  
      if (results.length > 0) {
        res.json({
          success: true,
          message: 'A valid post exists',
        });
      } else {
        res.json({
          success: false,
          message: 'No valid post found'
        });
      }
    });
});

module.exports = router;