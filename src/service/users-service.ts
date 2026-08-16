import { User } from "../types/users";

import {
    findAll,
    create,
    findById,
    deleteById,
    updateById,
    patchById
} from "../repositories/user-repository";


// Criar usuário
export function createUser(
    name: string,
    email: string
): User {

    const user: User = {
        id: Date.now(),
        name,
        email
    };

    return create(user);
}


// Listar usuários
export function getUsers(): User[] {
    return findAll();
}


// Buscar usuário por ID
export function getUserById(id: number) {
    return findById(id);
}


// Deletar usuário
export function deleteUser(id: number) {
    return deleteById(id);
}


// Atualizar usuário completo - PUT
export function updateUser(
    id: number,
    name: string,
    email: string
) {
    return updateById(id, name, email);
}


// Atualizar parcialmente - PATCH
export function patchUser(
    id: number,
    name?: string,
    email?: string
) {
    return patchById(id, name, email);
}
