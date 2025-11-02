import { Role, UserDataType } from '../users/repository/IUserRepository';
import { AttorneyDataType, CreateAttorney, GenericParams, IAttorneyRepository } from './repository/IAttorneyRepository';

export class AttorneyService {
    constructor(private readonly attorneyRepository: IAttorneyRepository) {}

    async findAll(queryParam: GenericParams, user?: UserDataType) {
        const params: GenericParams = {};

        if (queryParam?.name) params.name = queryParam.name;

        if (user) {
            params.companyId = user?.companyId;
        }
        return this.attorneyRepository.findAll(params);
    }

    async findOne(id: string) {
        return this.attorneyRepository.findOne(id);
    }

    async create({ companyId, ...body }: CreateAttorney) {
        return this.attorneyRepository.create({
            ...body,
            company: { connect: { id: companyId } },
        } as any);
    }

    async update(body: AttorneyDataType) {
        return this.attorneyRepository.update(body);
    }

    async remove(id: string) {
        const existUser = await this.attorneyRepository.findOne(id);

        if (!existUser) {
            throw { status: 404, message: 'registro não encontrado' };
        }

        const exclude = await this.attorneyRepository.remove(id);

        if (!exclude) {
            throw { status: 400, message: 'Erro ao excluir registro' };
        }

        return { message: 'Exclusão de registro realizado com sucesso!' };
    }
}
