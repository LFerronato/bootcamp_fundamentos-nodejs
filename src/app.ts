import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

export default app;

// https://www.youtube.com/watch?v=FYsFvjM6AJM&feature=youtu.be
