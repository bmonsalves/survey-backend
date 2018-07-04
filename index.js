import Debug from 'debug';
import app from './app';

const PORT = 4000;
const debug = new Debug('surveys:root');

app.listen(PORT, () => {
    debug(`Server running at port ${PORT}`)
});