export type CompanyCreate = {
  name: string;
  cnpj: string;
  id?: string | undefined;
};

export type CompanySave = {
  id: string;
  name: string;
  cnpj: string;
};

export interface ICompanyRepository {
  save(body: CompanyCreate): Promise<CompanySave>;
  // update(body: CompanySave): Promise<CompanySave>;
  findById(id: string): Promise<CompanySave | null>;
  findAll(): Promise<CompanySave[]>;
}
