import { Request, Response } from "express";
import { CreateUser } from "../types/users";
import { createUser, getUsers, getUserById, deleteUser, updateUser, patchUser } from "../service/users-service";

export function getUsersController(req: Request, res: Response) {
    const users = getUsers();

    res.json(users);
}

// Cria um usuário
export function createUserController(
    req: Request<{}, {}, CreateUser>,
    res: Response
) {
    const { name, email } = req.body;

    // Validação dos dados
    if (!name || !email || !email.includes("@")) {
        return res.status(400).json({
            message: "Bad Request"
        });
    }

    // Chama o Service para criar o usuário
    const user = createUser(name, email);

    // Retorna o usuário criado
    res.status(201).json(user);
}

export function getUserByIdController(
    req: Request,
    res: Response
) {
    const id = Number(req.params.id);

    const user = getUserById(id);

    if (!user) {
        return res.status(404).json({
            message: "Usuário não encontrado"
        });
    }

    res.status(200).json(user);
}


export function deleteUserController(
    req: Request,
    res: Response
) {
    const id = Number(req.params.id);

    const user = deleteUser(id);

    if (!user) {
        return res.status(404).json({
            message: "Usuário não encontrado"
        });
    }

    res.status(200).json({
        message: "Usuário deletado com sucesso",
        user
    });
}


export function updateUserController(
    req: Request<{ id: string }, {}, CreateUser>,
    res: Response
) {
    const id = Number(req.params.id);

    const { name, email } = req.body;

    // Validação
    if (!name || !email || !email.includes("@")) {
        return res.status(400).json({
            message: "Bad Request"
        });
    }

    const user = updateUser(id, name, email);

    if (!user) {
        return res.status(404).json({
            message: "Usuário não encontrado"
        });
    }

    res.status(200).json(user);
}

export function patchUserController(
    req: Request<{ id: string }, {}, Partial<CreateUser>>,
    res: Response
) {
    const id = Number(req.params.id);

    const { name, email } = req.body;

    // Pelo menos um campo precisa ser enviado
    if (!name && !email) {
        return res.status(400).json({
            message: "Informe pelo menos um dado para atualizar"
        });
    }

    // Se email foi enviado, precisa ser válido
    if (email && !email.includes("@")) {
        return res.status(400).json({
            message: "E-mail inválido"
        });
    }

    const user = patchUser(id, name, email);

    if (!user) {
        return res.status(404).json({
            message: "Usuário não encontrado"
        });
    }

    res.status(200).json(user);
}