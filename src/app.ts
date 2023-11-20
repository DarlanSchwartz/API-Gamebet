import 'reflect-metadata';
import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import MainRouter from './routes/index.routes';
import { loadEnv } from './config/envs';
import ErrorCatcher from '@/middlewares/errors.middleware';

loadEnv();
const app = express();

app.use(helmet());
app.use(cors());
app.use(json());
app.use(MainRouter);
app.use(ErrorCatcher);

export default app;
