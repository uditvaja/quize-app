// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const quizRoutes = require('./routes/quizRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to database
connectDB();

// Routes
app.use('/api/quizzes', quizRoutes);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
