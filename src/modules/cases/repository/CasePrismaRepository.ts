import { CaseStatus } from '@prisma/client';
import { prismaClient } from '../../../prisma/prismaClient';
import { CaseDataType, CreateCase, FindAllParameters, ICaseRepository } from './ICaseRepository';
import { GetCasesDTO } from '../cases.schema';

export class CasePrismaRepository implements ICaseRepository {
    async findAll(params?: GetCasesDTO): Promise<CaseDataType[]> {
        const whereClause: any = {};

        if (params?.companyId) {
            whereClause.companyId = params.companyId;
        }

        if (params?.processNumber) {
            whereClause.processNumber = { contains: params.processNumber, mode: 'insensitive' };
        }

        if (params?.title) {
            whereClause.OR = [{ title: { contains: params.title, mode: 'insensitive' } }];
        }

        if (params?.clientName) {
            whereClause.client = {
                OR: [
                    { firstName: { contains: params?.clientName, mode: 'insensitive' } },
                    { lastName: { contains: params?.clientName, mode: 'insensitive' } },
                ],
            };
        }

        const cases = prismaClient.case.findMany({
            where: whereClause,
            include: {
                client: {
                    select: {
                        document: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
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
            data: { ...data, status: data.status as unknown as CaseStatus } as any,
            where: { id },
        });

        return caseData as unknown as CaseDataType;
    }
}
