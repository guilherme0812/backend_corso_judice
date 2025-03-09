import { authMiddleware } from "../../middleware/authMiddleware";
import { UserController } from "./users.controller";
import { FastifyInstance } from "fastify";

const userController = new UserController();

export const usersRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/login", userController.login);
  fastify.post("/login-social", userController.loginSocial);
  fastify.get("/users", { preHandler: authMiddleware }, userController.findAll);
  fastify.post("/register", userController.register);
  fastify.put("/user", { preHandler: authMiddleware }, userController.update);
  fastify.delete(
    "/users",
    { preHandler: authMiddleware },
    userController.remove as any
  );
};
