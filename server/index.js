const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const home_api = require('./routes/home');
const facebook_api = require('./routes/facebook')
const path = require('path');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/home', home_api);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/facebook', facebook_api)

// app.get('/fb-feed', async (req, res) => {
//     const pageId = '448955944966879';
//     const accessToken = 'EAAPsMZAliwUkBO9SvICDclXsrK2CR7ecd9qa69dD7JomZABknFi8r8u7BovgFnKMrr0ZBvk4ZBZA6KXMiPwv81zmjykBSiL1dWLjSjfgYMLxjxMgcPeDPqzShnnDFk60lTJCDwZCaouf0ZBqU2zGhRtw9ZAdvYo4ovWETvm13fktBSB1yBmOJJ3ZA0vwR5d8cnArmJ1sRmAW7b31hQlel';
  
//     const url = `https://graph.facebook.com/v21.0/${pageId}/feed?access_token=${accessToken}`;
  
//     try {
//       const response = await axios.get(url);
//       res.status(200).json(response.data);
//     } catch (error) {
//       console.error('Error fetching data from Facebook API:', error);
//       res.status(500).json({ error: 'Failed to fetch data from Facebook API' });
//     }
// });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});