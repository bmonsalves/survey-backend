import express from 'express'
import { auth } from "../api";
import Debug from 'debug'
import { handleError } from "../utils";

const app = express.Router();
const debug = new Debug('surveys:auth');

app.post('/signin', async (req, res) => {

    debug('sign in');

    try {
        const u = await auth.signin(req.body);

        if (u.hasOwnProperty('error')){
            return handleLoginFailed(res, u.error)
        }
        res.status(200).json(u)

    } catch (error) {
        handleError(error,'no fue posible iniciar sesion', res)
    }

});


app.post('/signup', async (req, res) => {

    debug('sign up');

    try {
        const u = await auth.signup(req.body);
        res.status(200).json(u)

    } catch (error) {
        handleError(error,'no fue posible iniciar sesion', res)
    }

});

function handleLoginFailed(res,message) {
    return res.status(401).json({
        message: 'Login failed',
        error: message || 'Email and password don\'t match'
    })
}

export default app