import { prismaClient } from "../../../prisma/prismaClient";
import {
  ClientCreate,
  ClientDataType,
  GenericParams,
  IClientRepository,
} from "./IClientRepository";

export class ClientPrismaRepository implements IClientRepository {
  create(body: ClientCreate): Promise<ClientDataType> {
    return prismaClient.client.create({ data: body });
  }
  update(body: ClientCreate): Promise<ClientDataType> {
    return prismaClient.client.update({
      where: { document: body.document },
      data: body,
    });
  }
  remove(document: string): Promise<ClientDataType> {
    return prismaClient.client.delete({ where: { document } });
  }
  findOne(document: string): Promise<ClientDataType | null> {
    return prismaClient.client.findUnique({ where: { document } });
  }
  findAll({ companyId, name }: GenericParams): Promise<ClientDataType[]> {
    const whereClause: any = {};

    if (companyId) {
      whereClause.companyId = companyId;
    }

    if (name) {
      whereClause.OR = [
        { firstName: { contains: name, mode: "insensitive" } },
        { lastName: { contains: name, mode: "insensitive" } },
      ];
    }

    return prismaClient.client.findMany({
      where: whereClause,
    });
  }
}
