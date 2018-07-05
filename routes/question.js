import express from 'express';

const app = express.Router();

const currentUser = {
    name: 'Bernardo',
    lastname: 'Monsalves',
    email: 'bmonsalves@monsalves.com',
    password: '123456'
};

function questionMiddleware(req, res, next) {
    const {id} = req.params;
    req.question = questions.find(({ _id }) => _id === +id);
    next();
}

function userMiddleware(req, res, next) {
    req.user = currentUser;
    next();
}

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
app.get('/:id', questionMiddleware, (req, res) => {
    res.status(200).json(req.question);
});

// /v1/questions/
app.post('/', userMiddleware, (req, res) => {
    const q = req.body;
    q._id = +new Date();
    q.user = req.user;
    q.createdAt = new Date();
    q.answers = [];
    questions.push(q);
    res.status(201).json(q)
});

// /v1/questions/:id/answers
app.post('/:id/answers', questionMiddleware, userMiddleware, (req, res) => {
    const answer = req.body;
    const q = req.question;
    answer._id = +new Date();
    answer.user = req.user;
    answer.createdAt = new Date();
    q.answers.push(answer);
    res.status(201).json(answer)
});

export default app