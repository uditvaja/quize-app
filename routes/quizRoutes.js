// routes/quizRoutes.js
const express = require('express');
const Quiz = require('../models/Quiz');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
      const { title, description, questions } = req.body;
  
      // Create a new quiz
      const newQuiz = new Quiz({
        title,
        description,
        questions,
      });
  
      // Save the quiz to the database
      await newQuiz.save();
      res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create quiz' });
    }
  });
  
  module.exports = router;
// GET all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// GET quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

// POST submit quiz answers
router.post('/:id/submit', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    const { answers } = req.body;
    let score = 0;

    // Calculate score
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    res.json({ score, totalQuestions: quiz.questions.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit quiz answers' });
  }
});

module.exports = router;
