import { Request, Response } from "express";
import { prismaClient } from "../../database/client";

export class CompanyController {
  async findAll(request: Request, response: Response) {
    try {
      const result = await prismaClient.company.findMany();
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }
}
