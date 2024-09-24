import { ClientPrismaRepository } from "./repository/ClientPrismaRepository";
import { ClientService } from "./clients.service";
import { FastifyReply, FastifyRequest } from "fastify";

interface ClientQuery {
  document: string;
}

const clientRepository = new ClientPrismaRepository();
const clientService = new ClientService(clientRepository);

export class ClientsController {
  async findOne(
    request: FastifyRequest<{ Querystring: ClientQuery }>,
    reply: FastifyReply
  ) {
    try {
      const result = await clientService.findOne(
        request.query.document as string
      );
      return reply.status(200).send(result);
    } catch (error: any) {
      return reply.status(error.status || 500).send({
        message: error.message || "Internal server error",
      });
    }
  }

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await clientService.findAll();
      return reply.status(200).send(result);
    } catch (error: any) {
      return reply.status(error.status || 500).send({
        message: error.message || "Internal server error",
      });
    }
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await clientService.create(request.body as any);
      return reply.status(201).send(result);
    } catch (error: any) {
      return reply.status(error.status || 500).send({
        message: error.message || "Internal server error",
      });
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await clientService.update(request.body as any);
      return reply.status(200).send(result);
    } catch (error: any) {
      return reply.status(error.status || 500).send({
        message: error.message || "Internal server error",
      });
    }
  }

  async remove(
    request: FastifyRequest<{ Querystring: ClientQuery }>,
    reply: FastifyReply
  ) {
    try {
      const result = await clientService.remove(
        request.query.document as string
      );
      return reply.status(200).send(result);
    } catch (error: any) {
      return reply.status(error.status || 500).send({
        message: error.message || "Internal server error",
      });
    }
  }
}
