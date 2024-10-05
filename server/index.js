const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const home_api = require('./routes/home')

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/home', home_api);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});