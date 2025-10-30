import {
    CreateCustomDocumentMapping,
    CustomDocumentMappingDataType,
    ICustomDocumentMappingRepository,
} from './repository/ICustomDocumentMappingRepository';

export class CustomDocumentMappingService {
    constructor(private readonly customDocumentMappingRepository: ICustomDocumentMappingRepository) {}

    async findAll() {
        return this.customDocumentMappingRepository.findAll();
    }

    async findUniqueOrThrow(id: string) {
        const data = await this.customDocumentMappingRepository.findOne(id);
        if (!data) {
        }

        return data;
    }

    async findOne(id: string) {
        return this.customDocumentMappingRepository.findOne(id);
    }

    async findOneByCompanyId(companyId: string) {
        return this.customDocumentMappingRepository.findOneByCompanyId(companyId);
    }

    async create({ companyId, ...body }: CreateCustomDocumentMapping) {
        const exist = await this.findOneByCompanyId(companyId);

        if (exist) {
            throw { status: 400, message: 'Record already exists' };
        }

        return this.customDocumentMappingRepository.create({
            ...body,
            company: { connect: { id: companyId } },
        } as any);
    }

    async update(body: CustomDocumentMappingDataType) {
        return this.customDocumentMappingRepository.update(body);
    }

    async remove(id: string) {
        const existUser = await this.customDocumentMappingRepository.findOne(id);

        if (!existUser) {
            throw { status: 404, message: 'registro não encontrado' };
        }

        const exclude = await this.customDocumentMappingRepository.remove(id);

        if (!exclude) {
            throw { status: 400, message: 'Erro ao excluir registro' };
        }

        return { message: 'Exclusão de registro realizado com sucesso!' };
    }
}
