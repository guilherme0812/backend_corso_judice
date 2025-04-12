import { createResponse } from "../../utils/responseHelper";
import {
  CreateTask,
  FindAllParameters,
  ITaskRepository,
} from "./repository/ITaskRepository";

export class TaskService {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async findAll({ name, userId }: FindAllParameters) {
    return this.taskRepository.findAll({ name, userId });
  }
  async findOne(id: string) {
    return this.taskRepository.findOne(id);
  }
  async create(body: CreateTask) {
    return this.taskRepository.create(body);
  }
  async update(id: string, data: CreateTask) {
    return this.taskRepository.update(id, data);
  }
  async remove(id: string) {
    const existingTask = await this.taskRepository.findOne(id);
    if (!existingTask) {
      throw createResponse("Task not found", 404);
    }

    return this.taskRepository.remove(id);
  }
}
