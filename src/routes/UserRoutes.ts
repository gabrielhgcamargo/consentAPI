import { Router } from "express";
import { AuthenticateUserController } from "../modules/authenticateUser/useCases/AuthenticateUserController";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";

const createUserController = new CreateUserController();
const athenticateUserController = new AuthenticateUserController();

const userRoutes = Router();

userRoutes.post("/", createUserController.handle);
userRoutes.post("/login", athenticateUserController.handle);

export { userRoutes };
