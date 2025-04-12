enum TaskStatus {
  PENDING = "PENDING",
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export type TaskDataType = {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type CreateTask = {
  name: string;
  description: string;
  status: TaskStatus;
  userId: string;
};

export interface FindAllParameters {
  name?: string;
  userId?: string;
}

export interface ITaskRepository {
  findAll: (params?: FindAllParameters) => Promise<TaskDataType[]>;
  findOne: (id: string) => Promise<TaskDataType | null>;
  create: (body: CreateTask) => Promise<TaskDataType>;
  update(id: string, data: Partial<TaskDataType>): Promise<TaskDataType>;
  remove(id: string): Promise<TaskDataType>;
}
