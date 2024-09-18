export type CompanyCreate = {
  name: string;
  cnpj: string;
  id?: string | undefined;
};

export type CompanyDataType = {
  id: string;
  name: string;
  cnpj: string;
};

export interface ICompanyRepository {
  create(body: CompanyCreate): Promise<CompanyDataType>;
  // update(body: CompanySave): Promise<CompanySave>;
  findById(id: string): Promise<CompanyDataType | null>;
  findAll(): Promise<CompanyDataType[]>;
}
