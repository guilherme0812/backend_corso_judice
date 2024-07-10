import {
  CompanyCreate,
  ICompanyRepository,
} from "./repositories/ICompanyRepository";

export class CompanyService {
  constructor(private companyRepository: ICompanyRepository) {}

  async create(data: CompanyCreate) {}
}
