const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const homeAbout = require('./routes/home_about')

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api',homeAbout);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});