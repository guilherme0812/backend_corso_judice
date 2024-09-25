import { UserController } from "./users.controller";
import { FastifyInstance } from "fastify";

const userController = new UserController();

export const usersRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/login", userController.login);
  fastify.get("/users", userController.findAll);
  fastify.post("/register", userController.register);
  fastify.put("/user", userController.update);
  fastify.delete("/user", userController.remove);
};
