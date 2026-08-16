import express, { Request, Response} from 'express';
import userRouter from "./routes/user-routes";
import { CreateUser, User } from './types/users';

const app = express();

//Permite que o Express interprete JSON no req.body
app.use(express.json());

app.use(userRouter);

//inicializa o servidor
app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
});
