import { prismaClient } from "../../prisma/prismaClient";
import {
  ClientCreate,
  ClientDataType,
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
  findUniqueOrThrow(document: string): Promise<ClientDataType | null> {
    return prismaClient.client.findUniqueOrThrow({ where: { document } });
  }
  findAll(): Promise<ClientDataType[]> {
    return prismaClient.client.findMany();
  }
}
