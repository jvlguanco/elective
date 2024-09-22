require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
// app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect(err => {
    if (err) {
        console.log('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/api/home', (req, res) => {
    const query = 'SELECT * FROM about_home ORDER BY id ASC LIMIT 1';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    });
});

app.get('/image/:location', (req, res) => {
    const location = req.params.location;
    const sql = 'SELECT name, file FROM images WHERE location = ? LIMIT 1';
    
    db.query(sql, [location], (err, results) => {
      if (err) {
        console.error('Error fetching image:', err);
        res.status(500).send('Error fetching image');
      } else if (results.length > 0) {
        const image = {
          name: results[0].name,
          data: Buffer.from(results[0].file).toString('base64'),
        };

        res.json(image);
      } else {
        res.status(404).send('Image not found');
      }
    });
});

// app.get('/images/background', (req, res) => {
//     const sql = 'SELECT name, file FROM your_table_name WHERE location = ?';
//     db.query(sql, ['background'], (err, results) => {
//         if (err) {
//         console.error('Error fetching images:', err);
//         res.status(500).send('Error fetching images');
//         } else {
//         // Convert binary data to base64
//         const images = results.map((row) => ({
//             name: row.name,
//             data: Buffer.from(row.file).toString('base64'),
//         }));
//         res.json(images);
//         }
//     });
// });

// const AboutDetails = require('./home_page/about')(db); 
// app.use('/api/home', AboutDetails);