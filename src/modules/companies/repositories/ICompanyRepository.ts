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
  update(body: CompanyDataType): Promise<CompanyDataType>;
  remove(id: string): Promise<CompanyDataType>;
  findById(id: string): Promise<CompanyDataType | null>;
  findAll(): Promise<CompanyDataType[]>;
}
