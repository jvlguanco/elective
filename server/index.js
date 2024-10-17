const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const home_api = require('./routes/home');
const facebook_api = require('./routes/facebook')
const announcement_api = require('./routes/announcement')
const path = require('path');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/home', home_api);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/facebook', facebook_api);
app.use('/announcement', announcement_api);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});