import { prismaClient } from '../../../prisma/prismaClient';
import { AttorneyDataType, CreateAttorney, GenericParams, IAttorneyRepository } from './IAttorneyRepository';

export class AttorneyPrismaRepository implements IAttorneyRepository {
    findAll({ companyId, name }: GenericParams): Promise<AttorneyDataType[]> {
        const whereClause: any = {};

        if (companyId) {
            whereClause.companyId = companyId;
        }

        if (name) {
            whereClause.OR = [
                { firstName: { contains: name, mode: 'insensitive' } },
                { lastName: { contains: name, mode: 'insensitive' } },
            ];
        }

        const data = prismaClient.attorney.findMany({
            where: whereClause,
        });
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
