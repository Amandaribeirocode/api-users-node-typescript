import express, { Request, Response } from 'express';
import serverless from 'serverless-http'; // Importa o adaptador
import userRouter from "./routes/user-routes";
import { CreateUser, User } from './types/users';

const app = express();

app.use(express.json());
app.use(userRouter);

// Exporta o handler para a AWS em vez de rodar o app.listen()
export const handler = serverless(app);