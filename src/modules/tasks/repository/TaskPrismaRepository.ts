import { prismaClient } from "../../../prisma/prismaClient";
import {
  ITaskRepository,
  TaskDataType,
  FindAllParameters,
  CreateTask,
} from "./ITaskRepository";
export class TaskPrismaRepository implements ITaskRepository {
  async findAll(params?: FindAllParameters): Promise<TaskDataType[]> {
    const { name, userId } = params || {};
    const tasks = await prismaClient.task.findMany({
      where: {
        ...(userId ? { userId } : {}),
        ...(name ? { name: { contains: name } } : {}),
      },
    });

    return tasks as TaskDataType[];
  }

  async findOne(id: string): Promise<TaskDataType | null> {
    const task = (await prismaClient.task.findUnique({
      where: {
        id,
      },
    })) as TaskDataType | null;

    return task;
  }
  async create(body: CreateTask): Promise<TaskDataType> {
    const task = await prismaClient.task.create({
      data: {
        name: body.name,
        description: body.description,
        status: body.status,
        userId: body.userId,
      },
    });

    return task as unknown as TaskDataType;
  }
  async update(id: string, data: Partial<TaskDataType>): Promise<TaskDataType> {
    const task = await prismaClient.task.update({
      where: {
        id,
      },
      data,
    });

    return task as unknown as TaskDataType;
  }
  async remove(id: string): Promise<TaskDataType> {
    const task = await prismaClient.task.delete({
      where: {
        id,
      },
    });

    return task as unknown as TaskDataType;
  }
}
