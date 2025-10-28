import { prismaClient } from '../../../prisma/prismaClient';
import { GenericParams, CreateGraph, GraphDataType, IGraphRepository } from './IGraphRepository';

export class GraphPrismaRepository implements IGraphRepository {
    findAll({ companyId, name }: GenericParams): Promise<GraphDataType[]> {
        const whereClause: any = {};

        if (companyId) {
            whereClause.companyId = companyId;
        }

        if (name) {
            whereClause.OR = [{ name: { contains: name, mode: 'insensitive' } }];
        }

        const data = prismaClient.graph.findMany({
            where: whereClause,
        });
        return data;
    }

    findOne(id: string): Promise<GraphDataType | null> {
        return prismaClient.graph.findUnique({ where: { id } });
    }
    create(body: CreateGraph): Promise<GraphDataType> {
        return prismaClient.graph.create({ data: body as any });
    }

    update(body: GraphDataType): Promise<GraphDataType> {
        return prismaClient.graph.update({
            where: { id: body.id },
            data: body as any,
        });
    }

    remove(id: string): Promise<GraphDataType> {
        return prismaClient.graph.delete({ where: { id } });
    }
}
