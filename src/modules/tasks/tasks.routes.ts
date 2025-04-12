import { FastifyInstance } from "fastify";
import { TaskController } from "./tasks.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const taskController = new TaskController();
export async function tasksRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/tasks",
    { preHandler: [authMiddleware] },
    taskController.findAll
  );
  fastify.get(
    "/task",
    { preHandler: [authMiddleware] },
    taskController.findOne
  );
  fastify.post(
    "/task",
    { preHandler: [authMiddleware] },
    taskController.create
  );
  fastify.put("/task", { preHandler: [authMiddleware] }, taskController.update);
  fastify.delete(
    "/task",
    { preHandler: [authMiddleware] },
    taskController.remove
  );
}
