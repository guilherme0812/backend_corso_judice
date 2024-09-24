export type CompanyCreate = {
  id?: string;
  name: string;
  cnpj: string;
  banner?: string;
  countryId?: string;
  stateId?: string;
  cityId?: string;
  address?: string;
  phone1?: string;
  phone2?: string;
  hasWhatsapp1: boolean;
  hasWhatsapp2: boolean;
  email?: string;
  website?: string;
  registrationNumber?: string;
  taxRegime?: string;
  headquarters: boolean;
  isActive: boolean;
  createdBy?: string;
  updatedBy?: string;
  foundedAt?: Date;
  documentStorageUrl?: string;
  lastLoginAt?: Date;
  createAt?: Date;
  updateAt?: Date;
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
