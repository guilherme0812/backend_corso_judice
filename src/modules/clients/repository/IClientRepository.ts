export interface ClientCreate {
  document: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  cityId: string | null;
  stateId: string | null;
  countryId: string | null;
  birthDate: Date | null;
  notes: string | null;
  companyId: string | null;
  password: string;
  hasWhatsapp: boolean;
  profilePicture: string;
  isActive: boolean;
}

export interface ClientDataType {
  document: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  email: string | null;
  hasWhatsapp: boolean;
  address: string | null;
  cityId: string | null;
  stateId: string | null;
  countryId: string | null;
  birthDate: Date | null;
  notes: string | null;
  companyId: string | null;
}

export interface IClientRepository {
  findUniqueOrThrow(document: string): Promise<ClientDataType | null>;
  findAll(): Promise<ClientDataType[]>;
  create(data: ClientCreate): Promise<ClientDataType>;
  update(data: ClientDataType): Promise<ClientDataType>;
  remove(document: string): Promise<ClientDataType>;
}
