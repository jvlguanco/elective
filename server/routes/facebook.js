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

// router.get('/feed', async (req, res) => {
//     const url = `https://graph.facebook.com/v21.0/${PAGE_ID}/feed`;
  
//     try {
//       const response = await axios.get(url,
//         {
//             params: { access_token: PAGE_ACCESS_TOKEN },
//         }
//       );
//       res.status(200).json(response.data);
//     } catch (error) {
//       console.error('Error fetching data from Facebook API:', error);
//       res.status(500).json({ error: 'Failed to fetch data from Facebook API' });
//     }
// });
router.get('/normal-post', async (req, res) => {
    const query = "SELECT post_id FROM `posts` WHERE type = 'normal' ORDER BY id DESC"
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        const token = PAGE_ACCESS_TOKEN;

        res.json({ data: result, token });
    });
});

router.get('/highlighted-post', async (req, res) => {
    const query = "SELECT post_id FROM `posts` WHERE type = 'highlight' ORDER BY id DESC"
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        const token = PAGE_ACCESS_TOKEN;

        res.json({ data: result, token });
    });
});

router.get('/time-post', async (req, res) => {
    const query = "SELECT post_id, end_date FROM `posts` WHERE type = 'time-restricted' ORDER BY id DESC"
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        const token = PAGE_ACCESS_TOKEN;

        res.json({ data: result, token });
    });
});

router.delete('/delete/:id', async (req, res) => {
    const postId = req.params.id;
    const query = "DELETE FROM posts WHERE post_id = ?";
    
    try {
        await axios.delete(`https://graph.facebook.com/v21.0/${postId}`, {
            params: { access_token: PAGE_ACCESS_TOKEN },
        });

        db.query(query, [postId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Database error", details: err });
            }
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Post not found in the database." });
            }

            res.status(200).json({ message: "Post deleted successfully." });
        });
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json({
                error: "Failed to delete post from Facebook",
                details: error.response.data,
            });
        } else {
            return res.status(500).json({ error: "Failed to delete post", details: error.message });
        }
    }
});

router.post('/post', upload.array('images'), async (req, res) => {
    try {
        const { title, body, postType, endDate } = req.body;
        const images = req.files;
    
        const imageIds = [];
        for (const image of images) {
            const form = new FormData();
            form.append('access_token', PAGE_ACCESS_TOKEN);
            form.append('published', 'false');

            const file_path = path.join(__dirname, '..', image.path);
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
            fs.unlinkSync(file_path);
        }
    
        const attachedMedia = imageIds.map((id) => ({ media_fbid: id }));
        const postData = {
            message: `${title}\n\n${body}`,
            attached_media: attachedMedia,
            published: true,
            audience: "public",
            access_token: PAGE_ACCESS_TOKEN,
        };
    
        const postResponse = await axios.post(
            `https://graph.facebook.com/v21.0/${PAGE_ID}/feed`,
            postData
        );

        const post_id = postResponse.data.id;
        let query = '';
        let values = [];

        if (endDate) {
            query = 'INSERT INTO posts (post_id, type, end_date) VALUES (?, ?, ?)';
            values = [post_id, postType, endDate];
        } else {
            query = 'INSERT INTO posts (post_id, type) VALUES (?, ?)';
            values = [post_id, postType];
        }
        
        db.query(query, values, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Failed to save new file paths to database.');
            }

            res.json({ success: true, postId: post_id });
        });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});


module.exports = router;