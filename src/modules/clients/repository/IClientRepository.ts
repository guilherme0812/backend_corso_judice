export interface ClientCreate {
  document: string;
  firstName: string;
  lastName: string;
  companyId: string;
  role?: any;
}

export interface ClientDataType {
  document: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  companyId: string;
}

export interface IClientRepository {
  findUniqueOrThrow(document: string): Promise<ClientDataType | null>;
  findAll(): Promise<ClientDataType[]>;
  create(data: ClientCreate): Promise<ClientDataType>;
  update(data: ClientDataType): Promise<ClientDataType>;
  remove(document: string): Promise<ClientDataType>;
}
