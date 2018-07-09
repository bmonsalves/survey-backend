import express from 'express';
import { required } from '../middleware'
import { question } from "../api";
import { handleError } from "../utils";

const app = express.Router();

// /v1/questions
app.get('/',async (req, res) => {
    try {
        const questions = await question.findAll();
        res.status(200).json(questions);

    } catch (error) {
        handleError(error,'no fue posible obtener la lista de preguntas', res)
    }
});

// /api/questions/:id
app.get('/:id', async (req, res) => {
    try {
        const q = await question.findById(req.params.id);
        res.status(200).json(q)
    } catch (error) {
        handleError(error,'no fue posible obtener la pregunta', res)
    }
});

// /v1/questions/
app.post('/', required, (req, res) => {
    const q = req.body;
    q._id = +new Date();
    q.user = req.user;
    q.createdAt = new Date();
    q.answers = [];
    req.questions.push(q);
    res.status(201).json(q)
});

// /v1/questions/:id/answers
app.post('/:id/answers', required, (req, res) => {
    const answer = req.body;
    const q = req.question;
    answer._id = +new Date();
    answer.user = req.user;
    answer.createdAt = new Date();
    q.answers.push(answer);
    res.status(201).json(answer)
});

export default app