import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTask, FindAllParameters } from "./repository/ITaskRepository";
import { TaskService } from "./task.service";
import { TaskPrismaRepository } from "./repository/TaskPrismaRepository";
import { UserDataType } from "../users/repository/IUserRepository";

const taskrepository = new TaskPrismaRepository();
const taskService = new TaskService(taskrepository);

export class TaskController {
  async findAll(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, userId } = req.query as FindAllParameters;

      const tasks = await taskService.findAll({ name, userId });

      return reply.status(200).send(tasks);
    } catch (error: any) {
      reply.status(error.status || 400).send({ message: error.message });
    }
  }

  async findOne(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.query as { id: string };

      if (!id) {
        return reply.status(400).send({ message: "Id is required" });
      }

      const task = await taskService.findOne(id);
      if (!task) {
        return reply.status(404).send({ message: "Task not found" });
      }

      return reply.status(200).send(task);
    } catch (error: any) {
      reply.status(error.status || 400).send({ message: error.message });
    }
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { user } = req as unknown as { user: UserDataType };
      const body = req.body as any;

      if (!body.name) {
        return reply.status(400).send({ message: "Name is required" });
      }

      const task = await taskService.create({ ...body, userId: user.id });

      if (!task) {
        return reply.status(404).send({ message: "Task not found" });
      }

      return reply.status(201).send(task);
    } catch (error: any) {
      reply.status(error.status || 400).send({ message: error.message });
    }
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { user } = req as unknown as { user: UserDataType };
      const { id } = req.query as { id: string };
      const body = req.body as CreateTask;

      if (!id) {
        return reply.status(400).send({ message: "Id is required" });
      }

      if (user?.id !== body.userId) {
        return reply.status(403).send({ message: "User not authorized" });
      }

      const task = await taskService.update(id, body);

      if (!task) {
        return reply.status(404).send({ message: "Task not found" });
      }

      return reply.status(200).send(task);
    } catch (error: any) {
      reply.status(error.status || 400).send({ message: error.message });
    }
  }

  async remove(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.query as { id: string };

      if (!id) {
        return reply.status(400).send({ message: "Id is required" });
      }

      const task = await taskService.remove(id);

      if (!task) {
        return reply.status(404).send({ message: "Task not found" });
      }

      return reply.status(200).send(task);
    } catch (error: any) {
      reply.status(error.status || 400).send({ message: error.message });
    }
  }
}
