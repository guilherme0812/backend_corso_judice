import { prismaClient } from "../../prisma/prismaClient";
import {
  CompanyCreate,
  CompanyDataType,
  ICompanyRepository,
} from "./ICompanyRepository";

export class CompanyPrismaRepository implements ICompanyRepository {
  async findById(id: string): Promise<CompanyDataType | null> {
    return prismaClient.company.findUnique({ where: { id } });
  }

  async findAll(): Promise<CompanyDataType[]> {
    return prismaClient.company.findMany();
  }

  async create(body: CompanyCreate): Promise<CompanyDataType> {
    return prismaClient.company.create({ data: body });
  }

  async update(body: CompanyDataType): Promise<CompanyDataType> {
    return prismaClient.company.update({
      where: { id: body.id },
      data: body,
    });
  }

  async remove(id: string): Promise<CompanyDataType> {
    return prismaClient.company.delete({ where: { id } });
  }
}
