import { Request, Response } from "express";

export class ClientsController {
  async findAll(req: Request, res: Response) {
    return res.status(200).json([]);
  }

  async findOne(req: Request, res: Response) {
    return res.status(200).json([]);
  }

  async create(req: Request, res: Response) {
    return res.status(200).json([]);
  }

  async update(req: Request, res: Response) {
    return res.status(200).json([]);
  }

  async remove(req: Request, res: Response) {
    return res.status(200).json([]);
  }
}
