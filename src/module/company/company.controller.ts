import { Request, Response } from "express";

export class CompanyController {
  async create(request: Request, response: Response) {
    try {
      return response.status(400).json([]);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }
}
