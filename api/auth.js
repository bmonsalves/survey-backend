import Debug from 'debug'
import { User } from '../models'
import jwt from "jsonwebtoken";
import {secret, charEncrypt} from "../config";
import {
    hashSync as hash,
    compareSync as comparePasswords
} from 'bcryptjs'

const debug = new Debug('surveys:api:auth');

const createToken = (user) => jwt.sign({ user }, secret, { expiresIn: 86400 });

export default {

    signin: async (userData) => {
        const { email, password } = userData;
        const user = await User.findOne({ email });
        debug(`User ${JSON.stringify(user)}`);

        if (!user) {
            debug(`User with email ${email} not found`);
            return {
                error: 'Email no existe'
            };
        }

        if (!comparePasswords(password, user.password)) {
            debug(`Passwords do not match: ${password} !== ${user.password}`);
            return {
                error: 'contraseña incorrecta'
            };
        }

        const token = createToken(user);


        return {
            message: 'Login succeded',
            token: token,
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    },

    signup: async (userData) => {
        const { name, lastname, email, password } = userData;
        const u = new User({
            name,
            lastname,
            email,
            password: hash(password, charEncrypt)
        });
        debug(`Creating new user: ${u}`);
        const user = await u.save();
        const token = createToken(u);

        return {
            message: 'User saved',
            token,
            userId: user._id,
            name,
            lastname,
            email
        }
    },

}