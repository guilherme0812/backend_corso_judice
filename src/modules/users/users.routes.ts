import { Router } from "express";
import { UserController } from "./users.controller";

const usersRouter = Router();
const userController = new UserController();

usersRouter.post("/login", userController.login);
usersRouter.get("/users", userController.findAll);
usersRouter.post("/user", userController.register);
// usersRouter.post("/login", userController.register);
// usersRouter.delete("/user");

export { usersRouter };
