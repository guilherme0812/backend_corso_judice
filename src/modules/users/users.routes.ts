import { Router } from "express";
import { UserController } from "./users.controller";

const usersRouter = Router();
const authRouter = Router();
const userController = new UserController();

authRouter.post("/login", userController.login);
usersRouter.get("/users", userController.findAll);
usersRouter.post("/user", userController.register);
usersRouter.put("/user", userController.update);
usersRouter.delete("/user", userController.remove);

export { usersRouter, authRouter };
