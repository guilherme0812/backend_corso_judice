import { prismaClient } from "../../../database/client";
import {
  CompanyCreate,
  CompanyDataType,
  ICompanyRepository,
} from "./ICompanyRepository";

export class CompanyPrismaRepository implements ICompanyRepository {
  async findById(id: string): Promise<CompanyDataType | null> {
    return await prismaClient.company.findUnique({ where: { id: id } });
  }

  async findAll(): Promise<CompanyDataType[]> {
    return await prismaClient.company.findMany();
  }

  async create(body: CompanyCreate): Promise<CompanyDataType> {
    const bodyData: CompanyCreate = {
      cnpj: body.cnpj,
      name: body.name,
    };
    const company = await prismaClient.company.create({
      data: bodyData,
    });

    return company;
  }
}
