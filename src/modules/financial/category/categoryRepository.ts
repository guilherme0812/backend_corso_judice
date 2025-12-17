import { EntryStatus } from '@prisma/client';
import { prismaClient } from '../../../prisma/prismaClient';
import { FinancialCategoryDataType, GetFinancialCategoriesDTO } from './category.schema';

export class FinancialCategoryRepository {
    async create(data: Omit<FinancialCategoryDataType, 'id'>) {
        return prismaClient.financialCategory.create({ data: { ...data } });
    }

    async findAll({ companyId }: GetFinancialCategoriesDTO) {
        const whereClause: any = {};

        if (companyId) {
            whereClause.companyId = companyId;
        }

        return prismaClient.financialCategory.findMany({
            where: { ...whereClause },
        });
    }

    async findById(id: string) {
        return prismaClient.financialCategory.findUnique({ where: { id } });
    }

    remove(id: string) {
        return prismaClient.financialCategory.delete({ where: { id } });
    }
}
