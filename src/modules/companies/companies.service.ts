import { createResponse } from "../../utils/responseHelper";
import {
  CompanyCreate,
  CompanyDataType,
  ICompanyRepository,
} from "./repositories/ICompanyRepository";

export class CompanyService {
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async findAll() {
    return this.companyRepository.findAll();
  }

  async create(data: CompanyCreate) {
    await this.companyRepository.create({
      name: data.name,
      cnpj: data.cnpj,
      banner: data.banner,
      countryId: data.countryId,
      stateId: data.stateId,
      cityId: data.cityId,
      address: data.address,
      phone1: data.phone1,
      phone2: data.phone2,
      hasWhatsapp1: data.hasWhatsapp1 || false,
      hasWhatsapp2: data.hasWhatsapp2 || false,
      email: data.email,
      website: data.website,
      registrationNumber: data.registrationNumber,
      taxRegime: data.taxRegime,
      headquarters: data.headquarters || false,
      foundedAt: data.foundedAt,
      documentStorageUrl: data.documentStorageUrl,
      isActive: data.isActive !== undefined ? data.isActive : true,
    });

    return createResponse("Empresa criada com sucesso");
  }

  async update(id: string, body: CompanyDataType) {
    const existingCompany = await this.companyRepository.findById(id);

    if (!existingCompany) {
      throw createResponse("Company not found", 404);
    }

    await this.companyRepository.update(id, body);

    return createResponse("Empresa alterada com sucesso");
  }

  async findOne(id: string) {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw { status: 404, message: "Company not found" };
    }

    return company;
  }

  async remove(id: string) {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw { status: 404, message: "Company not found" };
    }

    await this.companyRepository.remove(id);

    return createResponse("Empresa removida com sucesso!", 200);
  }
}
