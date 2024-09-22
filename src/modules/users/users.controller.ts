import { Request, Response } from "express";
import { UserPrismaRepository } from "./repository/UsersPrismaRepository";
import { UserService } from "./users.service";

const userRepository = new UserPrismaRepository();
const userService = new UserService(userRepository);

export class UserController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      if (req.body.email && req.body.password) {
        const user = await userService.login({ email, password });
        res.status(201).json(user);
      } else {
        res.status(400).json({ message: "email or password" });
      }
    } catch (error: any) {
      res.status(error.status || 400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const user = await userService.findAll();
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async register(req: Request, res: Response) {
    try {
      if (req.body.email && req.body.password) {
        const user = await userService.register(req.body);
        res.status(201).json(user);
      } else {
        res.status(400).json({ message: "email or password" });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const user = await userService.update(req.body);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const user = await userService.remove(req.body.id);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
