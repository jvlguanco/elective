require('dotenv').config();
const express = require('express');
const cohere = require('cohere-ai');
const router = express.Router();

cohere.init(process.env.API_KEY)

app.post('/cohere-chat', async (req, res) => {
    const { message } = req.body;

    const prompt = `
    You are a helpful assistant specialized in answering questions about Pamantasan ng Lungsod ng Maynila (PLM). 
    Do not answer questions unrelated to PLM. If asked anything unrelated, politely decline and suggest asking PLM-specific questions.
  
    User: ${message}
    AI:`;
  
    try {
      const response = await cohere.generate({
        model: 'command-xlarge-nightly',
        prompt,
        max_tokens: 150,
        temperature: 0.7,
      });
  
      const reply = response.body.generations[0].text.trim();
      res.status(200).json({ reply });
    } catch (error) {
      console.error('Error generating response:', error);
      res.status(500).json({ error: 'Error generating response' });
    }
});

module.exports = router;