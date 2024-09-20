export type ClientCreate = {
  document: string;
  fistName: string;
  lastName: string;
  companyId: String;
};

export type ClientDataType = {
  document: string;
  fistName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  companyId: String;
};

export interface IClientRepository {
  create(body: ClientCreate): Promise<ClientDataType>;
  update(body: ClientCreate): Promise<ClientDataType>;
  remove(id: string): Promise<ClientDataType>;
  findById(id: string): Promise<ClientDataType | null>;
  findAll(): Promise<ClientDataType[]>;
}
