import express from 'express';

const app = express.Router();

const question = {
    _id: 1,
    title: 'desde el api ¿Cómo reutilizo un componente en Android?',
    description: 'Miren esta es mi pregunta...',
    createdAt: new Date(),
    icon: 'devicon-android-plain',
    answers: [],
    user: {
        firstName: 'Bernardo',
        lastName: 'Monsalves',
        email: 'bmonsalves@monsalves.com',
        password: '123456'
    }
}

const questions = new Array(10).fill(question);

// /v1/questions
app.get('/', (req, res) => res.status(200).json(questions));

// /api/questions/:id
app.get('/:id', (req, res) => {
    const {id} = req.params;
    const q = questions.find(({ _id }) => _id === +id);
    res.status(200).json(q)
});

// /v1/questions/
app.post('/', (req, res) => {
    const q = req.body;
    q._id = +new Date();
    q.user = {
        firstName: 'Bernardo',
        lastName: 'Monsalves',
        email: 'bmonsalves@monsalves.com',
        password: '123456'
    }
    q.createdAt = new Date();
    q.answers = [];
    questions.push(q);
    res.status(201).json(q)
});
export default app