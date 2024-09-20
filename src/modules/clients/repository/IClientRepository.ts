export interface ClientCreate {
  document: string;
  fistName: string;
  lastName: string;
  companyId: string;
}

export interface ClientDataType {
  document: string;
  fistName: string;
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
