import {
  ClientCreate,
  ClientDataType,
  IClientRepository,
} from "./repository/IClientRepository";

export class ClientService {
  constructor(private readonly clientRepository: IClientRepository) {}

  async findAll() {
    return this.clientRepository.findAll();
  }

  async findOne(document: string) {
    const client = await this.clientRepository.findUniqueOrThrow(document);

    if (!client) {
      throw { status: 404, message: "Client not found" };
    }

    return client;
  }

  async create(body: ClientCreate) {
    return this.clientRepository.create(body);
  }

  async update(body: ClientDataType) {
    const existClient = this.findOne(body.document);

    if (!existClient) {
      throw { status: 404, message: "Client not found" };
    }

    return this.clientRepository.update(body);
  }

  async remove(document: string) {
    const existClient = this.findOne(document);

    if (!existClient) {
      throw { status: 404, message: "Client not found" };
    }

    return this.clientRepository.remove(document);
  }
}
