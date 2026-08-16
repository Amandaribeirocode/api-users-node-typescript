import { createUser } from "../service/users-service";
import { User } from "../types/users";

const users: User[] = [];

export function findAll(): User[] {
    return users;
}

export function create(user: User): User {
    users.push(user);

    return user;
}

export function findById( id: number ) {
    const user = users.find(user => user.id === id);
    
    return user;
}

export function deleteById (id: number) {
    const user = users.find(user => user.id === id);

    const novosUsuarios = users.filter(user => user.id !== id);

    users.splice(0, users.length, ...novosUsuarios);

    return user
}

export function updateById(
    id: number,
    name: string, 
    email: string, 

) {
    const user = users.find(user => user.id === id);

    if (!user) {
        return undefined;
    }

    user.name = name;
    user.email = email;

    return user;
}

export function patchById(
    id: number,
    name?: string,
    email?: string,
) {
    const user = users.find(user => user.id === id);

    if (!user) {
        return undefined;
    }

    if (name) {
        user.name = name;
    }

    if (email) {
        user.email = email;
    }

    return user;

}