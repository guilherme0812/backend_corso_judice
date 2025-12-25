import { FastifyInstance } from "fastify";
import { CasesController, CustomFastifyQueryParam } from "./cases.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const casesController = new CasesController();

export async function casesRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/cases",
    { preHandler: [authMiddleware] },
    casesController.findAll as any
  );

  fastify.get(
    "/case",
    { preHandler: [authMiddleware] },
    casesController.findOne as any
  );

  fastify.post(
    "/case",
    { preHandler: [authMiddleware] },
    casesController.create
  );

  fastify.put(
    "/case",
    { preHandler: [authMiddleware] },
    casesController.update as any
  );

  fastify.delete(
    "/case",
    { preHandler: [authMiddleware] },
    casesController.delete as any
  );
 
  fastify.get(
    "/case/timeseries",
    { preHandler: [authMiddleware] },
    casesController.getCaseTimeSeries as any
  );
}
