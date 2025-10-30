import { prismaClient } from '../../../prisma/prismaClient';
import {
    CreateCustomDocumentMapping,
    CustomDocumentMappingDataType,
    ICustomDocumentMappingRepository,
} from './ICustomDocumentMappingRepository';

export class CustomDocumentMappingPrismaRepository implements ICustomDocumentMappingRepository {
    findAll(): Promise<CustomDocumentMappingDataType[]> {
        const data = prismaClient.customDocumentMapping.findMany();
        return data;
    }

    findOne(id: string): Promise<CustomDocumentMappingDataType | null> {
        return prismaClient.customDocumentMapping.findUnique({ where: { id } });
    }

    findOneByCompanyId(companyId: string): Promise<CustomDocumentMappingDataType | null> {
        return prismaClient.customDocumentMapping.findUnique({ where: { companyId } });
    }
    create(body: CreateCustomDocumentMapping): Promise<CustomDocumentMappingDataType> {
        return prismaClient.customDocumentMapping.create({ data: body as any });
    }

    update(body: CustomDocumentMappingDataType): Promise<CustomDocumentMappingDataType> {
        return prismaClient.customDocumentMapping.update({
            where: { id: body.id },
            data: body as any,
        });
    }

    remove(id: string): Promise<CustomDocumentMappingDataType> {
        return prismaClient.customDocumentMapping.delete({ where: { id } });
    }
}
