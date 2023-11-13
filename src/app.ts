import 'reflect-metadata';
import express, { json , Express } from "express";
import "express-async-errors";
import cors from 'cors';
import ErrorCatcher from "@/middlewares/errors.middleware";
import MainRouter from "./routes/index.routes";
import { loadEnv } from './config/envs';
loadEnv();
const app= express();

app.use(cors());
app.use(json());
app.use(MainRouter);
app.use(ErrorCatcher);

export default app;