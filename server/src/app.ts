import express from 'express';
import userRouter from './routes/userRouter';

const app = express();

app.use(express.json());
app.use('/api', userRouter);

export default app;