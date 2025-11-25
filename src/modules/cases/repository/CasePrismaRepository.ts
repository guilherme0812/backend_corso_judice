import { CaseStatus } from '@prisma/client';
import { prismaClient } from '../../../prisma/prismaClient';
import { CaseDataType, CreateCase, FindAllParameters, ICaseRepository } from './ICaseRepository';

export class CasePrismaRepository implements ICaseRepository {
    async findAll(params?: FindAllParameters): Promise<CaseDataType[]> {
        const cases = prismaClient.case.findMany();
        return cases as unknown as CaseDataType[];
    }

    async findOne(id: string): Promise<CaseDataType | null> {
        const data = await prismaClient.case.findUnique({ where: { id } });
        return data as unknown as CaseDataType | null;
    }

    async create(body: CreateCase): Promise<CaseDataType> {
        const caseData = await prismaClient.case.create({ data: { ...(body as any) } });

        return caseData as unknown as CaseDataType;
    }

    async remove(id: string): Promise<CaseDataType> {
        const caseData = await prismaClient.case.delete({ where: { id } });
        return caseData as unknown as CaseDataType;
    }

    async update(id: string, data: Partial<CaseDataType>): Promise<CaseDataType> {
        const caseData = await prismaClient.case.update({
            data: { ...data, status: data.status as unknown as CaseStatus },
            where: { id },
        });

        return caseData as unknown as CaseDataType;
    }
}
