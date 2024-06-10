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

// Use at least 3 different data collections within the database (such as users, posts, or comments)
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

// Define Schema for Lorem Ipsum
const loremSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

const Lorem = mongoose.model('Lorem', loremSchema);

// Define Schema for Users
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', userSchema);

// Define Schema for Posts
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Post = mongoose.model('Post', postSchema);

// Define Schema for Comments
const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Comment = mongoose.model('Comment', commentSchema);

// Routes for Lorem Ipsum
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

// Routes for Users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Routes for Posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username');
        res.json(posts);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/posts', async (req, res) => {
    const post = new Post(req.body);
    try {
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Routes for Comments
app.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find().populate('author', 'username').populate('post', 'title');
        res.json(comments);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/comments', async (req, res) => {
    const comment = new Comment(req.body);
    try {
        const savedComment = await comment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Utilizing reasonable data modeling practices
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

// Define Schema for Lorem Ipsum
const loremSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

const Lorem = mongoose.model('Lorem', loremSchema);

// Define Schema for Users
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', userSchema);

// Define Schema for Posts
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Post = mongoose.model('Post', postSchema);

// Define Schema for Comments
const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Comment = mongoose.model('Comment', commentSchema);

// Routes for Lorem Ipsum
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

// Routes for Users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Routes for Posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username').populate('comments', 'text');
        res.json(posts);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/posts', async (req, res) => {
    const post = new Post(req.body);
    try {
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Routes for Comments
app.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find().populate('author', 'username').populate('post', 'title');
        res.json(comments);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/comments', async (req, res) => {
    const comment = new Comment(req.body);
    try {
        const savedComment = await comment.save();
        await Post.findByIdAndUpdate(comment.post, { $push: { comments: savedComment._id } });
        res.status(201).json(savedComment);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Creating GET routes for all data that should be exposed to the client, using appropriate query commands to retrieve the data from the database.
// server.js

// Routes for Lorem Ipsum
app.get('/lorem', async (req, res) => {
    try {
        const lorem = await Lorem.find();
        res.json(lorem);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Routes for Users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Routes for Posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username').populate('comments', 'text');
        res.json(posts);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Routes for Comments
app.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find().populate('author', 'username').populate('post', 'title');
        res.json(comments);
    } catch (err) {
        res.status(500).send(err);
    }
});

- Create POST routes for data, as appropriate, using appropriate insertion commands to add data to the database. At least one data collection should allow for client creation via a POST request.

// server.js

// Route for creating Lorem Ipsum documents
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

// Route for creating users
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Route for creating posts
app.post('/posts', async (req, res) => {
    const post = new Post(req.body);
    try {
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Route for creating comments
app.post('/comments', async (req, res) => {
    const comment = new Comment(req.body);
    try {
        const savedComment = await comment.save();
        await Post.findByIdAndUpdate(comment.post, { $push: { comments: savedComment._id } });
        res.status(201).json(savedComment);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Creating PATCH or PUT routes for data, as appropriate, using appropriate update commands to change data in the database. At least one data collection should allow for client manipulation via a PATCH or PUT request.
// server.js

// Route for updating a post
app.patch('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;
    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).send('Post not found');
        }
        res.json(updatedPost);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Route for updating a comment
app.put('/comments/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    try {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, req.body, { new: true });
        if (!updatedComment) {
            return res.status(404).send('Comment not found');
        }
        res.json(updatedComment);
    } catch (err) {
        res.status(400).send(err);
    }
});

- Create DELETE routes for data, as appropriate, using appropriate delete commands to remove data from the database. At least one data collection should allow for client deletion via a DELETE request

// server.js

// Route for deleting a post
app.delete('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).send('Post not found');
        }
        // Remove post ID from associated comments
        await Comment.deleteMany({ post: postId });
        res.json(deletedPost);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Route for deleting a comment
app.delete('/comments/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return res.status(404).send('Comment not found');
        }
        // Remove comment ID from associated post
        await Post.findByIdAndUpdate(deletedComment.post, { $pull: { comments: commentId } });
        res.json(deletedComment);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Including sensible indexes for any and all fields that are queried frequently. For fields that may have a high write-to-read ratio, you may forgo indexes for performance considerations. Make comments of this where applicable
// server.js

// Define Schema for Users
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, index: true }, // Index username for frequent querying
    email: { type: String, required: true, unique: true, index: true } // Index email for frequent querying and enforce uniqueness
});

// Define Schema for Posts
const postSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true }, // Index title for frequent querying
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Define Schema for Comments
const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Indexing for frequently queried fields: title, username, email
userSchema.index({ username: 1, email: 1 });
postSchema.index({ title: 1 });

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);

// Including sensible MongoDB data validation rules for at least one data collection.
// server.js

// Define Schema for Users with validation rules
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        minlength: 3, // Username must be at least 3 characters long
        maxlength: 50 // Username cannot exceed 50 characters
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, // Convert email to lowercase before saving
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // Email format validation using regex
    }
});

const User = mongoose.model('User', userSchema);

// Populating the application's collections with sample data illustrating the use case of the collections. include at least five sample documents per collection.
// server.js

// Function to populate Lorem Ipsum documents
const populateLorem = async () => {
    const loremIpsum = new LoremIpsum();

    const loremDocuments = [
        { title: 'Sample Document 1', content: loremIpsum.generateParagraphs(5) },
        { title: 'Sample Document 2', content: loremIpsum.generateParagraphs(4) },
        { title: 'Sample Document 3', content: loremIpsum.generateParagraphs(6) },
        { title: 'Sample Document 4', content: loremIpsum.generateParagraphs(7) },
        { title: 'Sample Document 5', content: loremIpsum.generateParagraphs(3) }
    ];

    await Lorem.insertMany(loremDocuments);
    console.log('Lorem Ipsum documents populated');
};

// Function to populate users
const populateUsers = async () => {
    const userDocuments = [
        { username: 'user1', email: 'user1@example.com' },
        { username: 'user2', email: 'user2@example.com' },
        { username: 'user3', email: 'user3@example.com' },
        { username: 'user4', email: 'user4@example.com' },
        { username: 'user5', email: 'user5@example.com' }
    ];

    await User.insertMany(userDocuments);
    console.log('Users populated');
};

// Function to populate posts
const populatePosts = async () => {
    const user1 = await User.findOne({ username: 'user1' });

    const postDocuments = [
        { title: 'Post 1', content: 'Content of Post 1', author: user1._id },
        { title: 'Post 2', content: 'Content of Post 2', author: user1._id }
    ];

    await Post.insertMany(postDocuments);
    console.log('Posts populated');
};

// Function to populate comments
const populateComments = async () => {
    const user2 = await User.findOne({ username: 'user2' });
    const post1 = await Post.findOne({ title: 'Post 1' });

    const commentDocuments = [
        { text: 'Comment 1 on Post 1', post: post1._id, author: user2._id },
        { text: 'Comment 2 on Post 1', post: post1._id, author: user2._id }
    ];

    await Comment.insertMany(commentDocuments);
    console.log('Comments populated');
};

// Populate collections with sample data
populateLorem();
populateUsers();
populatePosts();
populateComments();
