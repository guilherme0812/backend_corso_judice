import { Request, Response } from "express";
import { ClientPrismaRepository } from "./repository/ClientPrismaRepository";
import { ClientService } from "./clients.service";

const clientRepository = new ClientPrismaRepository();
const clientService = new ClientService(clientRepository);

export class ClientsController {
  async findOne(request: Request, response: Response) {
    try {
      const result = await clientService.findOne(
        request.query.document as string
      );
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(error.status || 500).json({
        message: error.message || "Internal server error",
      });
    }
  }

  async findAll(request: Request, response: Response) {
    try {
      const result = await clientService.findAll();
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(error.status || 500).json({
        message: error.message || "Internal server error",
      });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const result = await clientService.create(request.body);
      return response.status(201).json(result);
    } catch (error: any) {
      return response.status(error.status || 500).json({
        message: error.message || "Internal server error",
      });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const result = await clientService.update(request.body);
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(error.status || 500).json({
        message: error.message || "Internal server error",
      });
    }
  }

  async remove(request: Request, response: Response) {
    try {
      const result = await clientService.remove(
        request.query.document as string
      );
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(error.status || 500).json({
        message: error.message || "Internal server error",
      });
    }
  }
}
