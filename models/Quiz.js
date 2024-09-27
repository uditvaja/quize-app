// models/Quiz.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  choices: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, // Store the index of the correct answer
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [questionSchema],
});

module.exports = mongoose.model('Quiz', quizSchema);
