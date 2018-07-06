import express from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken';

const app = express.Router();
const debug = new Debug('surveys:auth');
const secret = 'questionsSurveys';
const users = [
    {
        name: 'Bernardo',
        lastname: 'Monsalves',
        email: 'bmonsalves@monsalves.com',
        password: '123456',
        _id:123
    }
];

const findUserByEmail = e => users.find(({ email }) => email === e);

function comparePasswords(providedPassword, userPassword) {
    return providedPassword === userPassword
}

const createToken = (user) => jwt.sign({ user }, secret, { expiresIn: 86400 });

app.post('/signin', (req, res, next) => {
    const { email, password } = req.body;
    const user = findUserByEmail(email);

    if (!user) {
        debug(`User with email ${email} not found`);
        return handleLoginFailed(res);
    }

    if (!comparePasswords(password, user.password)) {
        debug(`Passwords do not match: ${password} !== ${user.password}`);
        return handleLoginFailed(res,`usuario o contraseña incorrecto`);
    }

    const token = createToken(user);

    res.status(200).json({
        message: 'Login succeded',
        token: token,
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    })
});


app.post('/signup', (req, res) => {
    const { name, lastname, email, password } = req.body;
    const user = {
        _id: +new Date(),
        name,
        lastname,
        email,
        password
    };
    debug(`Creating new user: ${user}`);
    users.push(user);
    const token = createToken(user);
    res.status(201).json({
        message: 'User saved',
        token,
        userId: user._id,
        name,
        lastname,
        email
    })
});

function handleLoginFailed(res,message) {
    return res.status(401).json({
        message: 'Login failed',
        error: message || 'Email and password don\'t match'
    })
}

export default app