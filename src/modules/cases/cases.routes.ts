import { FastifyInstance } from "fastify";
import { CasesController } from "./cases.controller";

const casesController = new CasesController();

export async function casesRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/cases",
    // { preHandler: [authMiddleware] },
    casesController.findAll
  );
}
