import express from 'express';
import { required, questionMiddleware } from '../middleware'
import { question } from "../api";
import { handleError } from "../utils";
import Debug from 'debug'

const app = express.Router();
const debug = new Debug('surveys:auth');

// /v1/questions
app.get('/',async (req, res) => {

    debug('get questions');

    try {
        const questions = await question.findAll();
        res.status(200).json(questions);

    } catch (error) {
        handleError(error,'no fue posible obtener la lista de preguntas', res)
    }
});

// /api/questions/:id
app.get('/:id', async (req, res) => {

    debug(`get question ${req.params.id}`);

    try {
        const q = await question.findById(req.params.id);
        res.status(200).json(q)
    } catch (error) {
        handleError(error,'no fue posible obtener la pregunta', res)
    }
});

// /v1/questions/
app.post('/', required, async (req, res) => {

    debug(`create question`);

    try {
        const savedQuestion = await question.createQuestion(req.body, req.user);

        res.status(201).json(savedQuestion)

    } catch (error) {
        handleError(error,'no fue posible crear la pregunta', res)
    }

});

// /v1/questions/:id/answers
app.post('/:id/answers', required, questionMiddleware, async (req, res) => {

    debug(`create answer`);

    try {
        const savedAnswer = await question.createAnswer(req.body, req.question, req.user);

        res.status(201).json(savedAnswer)

    } catch (error) {
        handleError(error, res)
    }

});

export default app