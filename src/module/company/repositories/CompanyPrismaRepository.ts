import { prismaClient } from "../../../database/client";
import {
  CompanyCreate,
  CompanySave,
  ICompanyRepository,
} from "./ICompanyRepository";

export class CompanyPrismaRepository implements ICompanyRepository {
  async findById(id: string): Promise<CompanySave | null> {
    return await prismaClient.company.findUnique({ where: { id: id } });
  }

  async findAll(): Promise<CompanySave[]> {
    return await prismaClient.company.findMany();
  }

  async save(body: CompanyCreate): Promise<CompanySave> {
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
