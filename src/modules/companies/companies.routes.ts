import { FastifyInstance } from "fastify";
import { CompaniesController } from "./companies.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const companiesController = new CompaniesController();

export async function companiesRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/companies",
    { preHandler: [authMiddleware] },
    companiesController.findAll
  );
  fastify.get(
    "/company",
    { preHandler: [authMiddleware] },
    companiesController.findOne as any
  );
  fastify.post("/company", companiesController.create);
  fastify.put("/company", companiesController.update);
  fastify.delete("/company", companiesController.remove);
}
