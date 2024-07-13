import { Request, Response } from "express";
import { CompanyPrismaRepository } from "./repositories/CompanyPrismaRepository";
import { CompanyService } from "./company.service";

export class CompanyController {
  async findAll(request: Request, response: Response) {
    try {
      const companyRepository = new CompanyPrismaRepository();
      const companyService = new CompanyService(companyRepository);

      const result = await companyService.findAll();
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const companyRepository = new CompanyPrismaRepository();
      const companyService = new CompanyService(companyRepository);

      const result = await companyService.create(request.body);

      return response.json(result).status(201);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }
}
