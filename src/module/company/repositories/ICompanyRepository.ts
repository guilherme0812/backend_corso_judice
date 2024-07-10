export type CompanyCreate = {
  name: string;
  ncpj: string;
  id?: string | undefined;
};

export type CompanySave = {
  name: string;
  cnpj: string;
  id: string;
};

export interface ICompanyRepository {
  save(body: CompanyCreate): Promise<CompanySave>;
  findAll(): Promise<CompanySave[]>;
}
