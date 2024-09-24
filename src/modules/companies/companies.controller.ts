import { Request, Response } from "express";
import { CompanyPrismaRepository } from "./repositories/CompanyPrismaRepository";
import { CompanyService } from "./companies.service";
import { FastifyReply, FastifyRequest } from "fastify";

const companyRepository = new CompanyPrismaRepository();
const companyService = new CompanyService(companyRepository);

interface CompanyQuery {
  id: string;
}

export class CompaniesController {
  async findOne(
    request: FastifyRequest<{ Querystring: CompanyQuery }>,
    reply: FastifyReply
  ) {
    try {
      const result = await companyService.findOne(request.query.id as string);
      return reply.status(200).send(result);
    } catch (error: any) {
      return reply.status(error.status || 500).send({
        message: error.message || "Internal server error",
      });
    }
  }

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await companyService.findAll();
      return reply.status(200).send(result);
    } catch (error: any) {
      return reply.status(error.status || 500).send({
        message: error.message || "Internal server error",
      });
    }
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await companyService.create(request.body as any);
      return reply.status(201).send(result);
    } catch (error: any) {
      return reply.status(error.status || 500).send({
        message: error.message || "Internal server error",
      });
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await companyService.update(request.body as any);
      return reply.status(200).send(result);
    } catch (error: any) {
      return reply.status(error.status || 500).send({
        message: error.message || "Internal server error",
      });
    }
  }

  async remove(
    request: FastifyRequest<{ Querystring: CompanyQuery }>,
    reply: FastifyReply
  ) {
    try {
      const result = await companyService.remove(request.query.id as string);
      return reply.status(200).send(result);
    } catch (error: any) {
      return reply.status(error.status || 500).send({
        message: error.message || "Internal server error",
      });
    }
  }
}
