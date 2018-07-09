import Debug from 'debug';
import app from './app';
import mongoose from 'mongoose'
import { mongoUrl } from "./config";

const PORT = 4000;
const debug = new Debug('surveys:root');

mongoose.Promise = global.Promise;

async function start () {
    await mongoose.connect(mongoUrl,{ useNewUrlParser: true });

    app.listen(PORT, () => {
        debug(`Server running at port ${PORT}`)
    });
}

start();