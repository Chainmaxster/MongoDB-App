// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/loremDB', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define Schema
const loremSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

const Lorem = mongoose.model('Lorem', loremSchema);

// Routes
app.get('/lorem', async (req, res) => {
    try {
        const lorem = await Lorem.find();
        res.json(lorem);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/lorem', async (req, res) => {
    const { title, paragraphs } = req.body;
    const loremIpsum = new LoremIpsum();

    const content = loremIpsum.generateParagraphs(paragraphs);

    const lorem = new Lorem({ title, content });

    try {
        const savedLorem = await lorem.save();
        res.status(201).json(savedLorem);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
