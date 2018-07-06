import express from 'express';
import {
  required,
  questionMiddleware,
  questionsMiddleware
} from '../middleware'

const app = express.Router();

// /v1/questions
app.get('/', questionsMiddleware, (req, res) => res.status(200).json(req.questions));

// /api/questions/:id
app.get('/:id', questionMiddleware, (req, res) => {
    res.status(200).json(req.question);
});

// /v1/questions/
app.post('/', required, questionsMiddleware, (req, res) => {
    const q = req.body;
    q._id = +new Date();
    q.user = req.user;
    q.createdAt = new Date();
    q.answers = [];
    req.questions.push(q);
    res.status(201).json(q)
});

// /v1/questions/:id/answers
app.post('/:id/answers', required, questionMiddleware, (req, res) => {
    const answer = req.body;
    const q = req.question;
    answer._id = +new Date();
    answer.user = req.user;
    answer.createdAt = new Date();
    q.answers.push(answer);
    res.status(201).json(answer)
});

export default app