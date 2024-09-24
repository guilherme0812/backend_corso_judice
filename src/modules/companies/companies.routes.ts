import { FastifyInstance } from "fastify";
import { CompaniesController } from "./companies.controller";

const companiesController = new CompaniesController();

export async function companiesRoutes(fastify: FastifyInstance) {
  fastify.get("/companies", companiesController.findAll);
  fastify.get("/company", companiesController.findOne);
  fastify.post("/company", companiesController.create);
  fastify.put("/company", companiesController.update);
  fastify.delete("/company", companiesController.remove);
}
