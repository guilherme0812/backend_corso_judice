import { createResponse } from '../../utils/responseHelper';
import { Role, UserDataType } from '../users/repository/IUserRepository';
import { ClientCreate, ClientDataType, GenericParams, IClientRepository } from './repository/IClientRepository';

export class ClientService {
    constructor(private readonly clientRepository: IClientRepository) {}

    async findAll(queryParams: GenericParams, user?: UserDataType) {
        const params: GenericParams = queryParams;

        if (params.name) queryParams.name = params.name;

        if (user) {
            params.companyId = user?.companyId;
        }

        return this.clientRepository.findAll(params);
    }

    async findOne(document: string) {
        const client = await this.clientRepository.findOne(document);

        return client;
    }

    async findUniqueOrThrow(document: string) {
        const client = await this.findOne(document);

        if (!client) {
            throw { status: 404, message: 'Client not found' };
        }

        return client;
    }

    async create({ companyId, ...body }: ClientCreate) {
        const alreadyCreated = await this.findOne(body.document);

        if (alreadyCreated) {
            throw createResponse('Não foi possível registrar esse clinte', 400);
        }

        return this.clientRepository.create({
            ...body,
            company: { connect: { id: companyId } },
        } as any);
    }

    async update(body: ClientDataType) {
        const existClient = this.findOne(body.document);

        if (!existClient) {
            throw { status: 404, message: 'Client not found' };
        }

        return this.clientRepository.update(body);
    }

    async remove(document: string) {
        const existClient = this.findOne(document);

        if (!existClient) {
            throw { status: 404, message: 'Client not found' };
        }

        return this.clientRepository.remove(document);
    }
}
