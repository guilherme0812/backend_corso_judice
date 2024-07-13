import {
  CompanyCreate,
  ICompanyRepository,
} from "./repositories/ICompanyRepository";

export class CompanyService {
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async findAll() {
    return await this.companyRepository.findAll();
  }

  async create(body: CompanyCreate) {
    return await this.companyRepository.save(body);
  }
}
