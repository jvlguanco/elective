require('dotenv').config();

const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../db');
const upload = require('../storage');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');


const PAGE_ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const PAGE_ID = process.env.PAGE_ID;

router.get('/feed', async (req, res) => {
    const url = `https://graph.facebook.com/v21.0/${PAGE_ID}/feed`;
  
    try {
      const response = await axios.get(url,
        {
            params: { access_token: PAGE_ACCESS_TOKEN },
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching data from Facebook API:', error);
      res.status(500).json({ error: 'Failed to fetch data from Facebook API' });
    }
});

router.post('/post', upload.array('images'), async (req, res) => {
    try {
      const { title, body } = req.body;
      const images = req.files;
      console.log(images)
  
      const imageIds = [];
      for (const image of images) {
        const form = new FormData();
        form.append('access_token', PAGE_ACCESS_TOKEN);
        form.append('published', 'false');

        const file_path = path.join(__dirname, '..', image.path)
        const fileStream = fs.createReadStream(file_path);

        form.append('source', fileStream, {
          filename: image.originalname,
          contentType: image.mimetype,
        });
        
  
        const response = await axios.post(
          `https://graph.facebook.com/v21.0/${PAGE_ID}/photos`,
          form,
          { headers: form.getHeaders() }
        );
  
        imageIds.push(response.data.id);

        fs.unlinkSync(file_path)
      }
  
      const attachedMedia = imageIds.map((id) => ({ media_fbid: id }));
      const postData = {
        message: `${title}\n\n${body}`,
        attached_media: attachedMedia,
        access_token: PAGE_ACCESS_TOKEN,
      };
  
      const postResponse = await axios.post(
        `https://graph.facebook.com/v21.0/${PAGE_ID}/feed`,
        postData
      );
  
      res.json({ success: true, postId: postResponse.data.id });
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      res.status(500).json({ success: false, error: error.message });
    }
});


module.exports = router;