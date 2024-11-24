const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const home_api = require('./routes/home');
const facebook_api = require('./routes/facebook')
const announcement_api = require('./routes/announcement')
const career_api = require('./routes/career')
const about_api = require('./routes/about')
const user_api = require('./routes/user')
const bid_api = require('./routes/bids')
const academic_api = require('./routes/academic')
const office_api = require('./routes/offices')
const path = require('path');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));
app.use(bodyParser.json());

app.use('/home', home_api);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/facebook', facebook_api);
app.use('/announcement', announcement_api);
app.use('/career', career_api)
app.use('/about', about_api)
app.use('/user', user_api)
app.use('/bid', bid_api)
app.use('/academic', academic_api)
app.use('/office', office_api)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});