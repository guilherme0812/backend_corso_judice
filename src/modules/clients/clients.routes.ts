import { ClientsController } from "./clients.controller";
import { FastifyInstance } from "fastify";

const clientsController = new ClientsController();

export const clientsRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/clients", clientsController.findAll);
  fastify.get("/client", clientsController.findOne);
  fastify.post("/client", clientsController.create);
  fastify.put("/client", clientsController.update);
  fastify.delete("/client", clientsController.remove);
};
