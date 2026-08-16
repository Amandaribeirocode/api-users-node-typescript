import { Router } from "express";
import { getUsersController, createUserController, getUserByIdController, deleteUserController, updateUserController, patchUserController } from "../controllers/user-controller";

const router = Router();

//lista os usuários cadastrados 
router.get('/users', getUsersController);


// Cria um usuário
router.post("/users", createUserController);

// Procura um usuário pelo id 
router.get("/users/:id", getUserByIdController);

//Deleta um usuário
router.delete("/users/:id", deleteUserController);

router.put("/users/:id", updateUserController);

router.patch("/users/:id", patchUserController);

export default router;