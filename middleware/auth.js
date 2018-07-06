import Debug from 'debug'
import { secret } from '../config';
import jwt from 'jsonwebtoken';


const debug = new Debug('surveys:auth-middleware');
export const users = [
    {
        name: 'Bernardo',
        lastname: 'Monsalves',
        email: 'bmonsalves@monsalves.com',
        password: '123456',
        _id:123
    }
];

export const findUserByEmail = e => users.find(({ email }) => email === e);

export const required = (req, res, next) => {
    jwt.verify(req.query.token, secret, (err, token) => {
        if(err){
            debug('JWT was not encrypted with secret');
            return res.status(401).json({
                message:'sin permisos',
                error: err
            })
        }

        debug(`Valid token ${token}`);
        req.user = token.user;
        next();

    });
};