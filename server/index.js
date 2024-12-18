const express = require('express');
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
const admission_api = require('./routes/admission')
const other_api = require('./routes/other')
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
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
app.use('/admission', admission_api)
app.use('/other', other_api)

app.get('/test', (req, res)=> res.send("HELLO"))

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});