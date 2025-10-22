import { prismaClient } from '../../../prisma/prismaClient';
import { AttorneyDataType, CreateAttorney, FindAllParameters, IAttorneyRepository } from './IAttorneyRepository';

export class AttorneyPrismaRepository implements IAttorneyRepository {
    findAll(params?: FindAllParameters): Promise<AttorneyDataType[]> {
        const data = prismaClient.attorney.findMany();
        return data;
    }

    findOne(id: string): Promise<AttorneyDataType | null> {
        return prismaClient.attorney.findUnique({ where: { id } });
    }
    create(body: CreateAttorney): Promise<AttorneyDataType> {
        return prismaClient.attorney.create({ data: body });
    }

    update(body: AttorneyDataType): Promise<AttorneyDataType> {
        return prismaClient.attorney.update({
            where: { id: body.id },
            data: body,
        });
    }

    remove(id: string): Promise<AttorneyDataType> {
        return prismaClient.attorney.delete({ where: { id } });
    }
}
