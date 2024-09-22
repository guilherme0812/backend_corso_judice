import { Role } from "@prisma/client";
import { prismaClient } from "../../prisma/prismaClient";
import { UserCreate, UserDataType, IUserRepository } from "./IUserRepository";

export class UserPrismaRepository implements IUserRepository {
  async findUserByEmail(email: string): Promise<UserDataType | null> {
    const user: any = prismaClient.user.findUniqueOrThrow({
      where: { email },
      include: {
        company: true,
      },
    });

    return user;
  }

  async create(body: UserCreate): Promise<UserDataType> {
    return prismaClient.user.create({
      data: { ...body, role: body.role as unknown as Role },
    });
  }

  async update(body: UserCreate): Promise<UserDataType> {
    return prismaClient.user.create({
      data: { ...body, role: body.role as unknown as Role },
    });
  }

  remove(id: string): Promise<UserDataType> {
    return prismaClient.user.delete({ where: { id } });
  }
}
