import { Request, Response } from "express";
import { CompanyPrismaRepository } from "./repositories/CompanyPrismaRepository";
import { CompanyService } from "./companies.service";

const companyRepository = new CompanyPrismaRepository();
const companyService = new CompanyService(companyRepository);

export class CompaniesController {
  async findOne(request: Request, response: Response) {
    try {
      const result = await companyService.findOne(request.query.id as string);
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(error.status || 500).json({
        message: error.message || "Internal server error",
      });
    }
  }

  async findAll(request: Request, response: Response) {
    try {
      const result = await companyService.findAll();
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(error.status || 500).json({
        message: error.message || "Internal server error",
      });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const result = await companyService.create(request.body);
      return response.status(201).json(result);
    } catch (error: any) {
      return response.status(error.status || 500).json({
        message: error.message || "Internal server error",
      });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const result = await companyService.update(request.body);
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(error.status || 500).json({
        message: error.message || "Internal server error",
      });
    }
  }

  async remove(request: Request, response: Response) {
    try {
      const result = await companyService.remove(request.query.id as string);
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(error.status || 500).json({
        message: error.message || "Internal server error",
      });
    }
  }
}
