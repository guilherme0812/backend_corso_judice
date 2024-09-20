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

  async create(body: CompanyCreate) {
    return this.companyRepository.create(body);
  }

  async update(body: CompanyDataType) {
    const existingCompany = await this.companyRepository.findById(body.id);

    if (!existingCompany) {
      throw { status: 404, message: "Company not found" };
    }

    return this.companyRepository.update(body);
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

    return this.companyRepository.remove(id);
  }
}
