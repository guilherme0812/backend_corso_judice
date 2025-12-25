import { CaseStatus, Prisma } from '@prisma/client';
import { prismaClient } from '../../../prisma/prismaClient';
import { CaseDataType, CreateCase, FindAllParameters, ICaseRepository } from './ICaseRepository';
import { GetCasesDTO } from '../cases.schema';

type Period = 'week' | 'month' | 'year';

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

    async getCaseTimeSeries(companyId: string, period: Period, referenceDate: Date = new Date()) {
        const weekSql = Prisma.sql`
    WITH calendar AS (
      SELECT generate_series(
        date_trunc('week', ${referenceDate}::date),
        date_trunc('week', ${referenceDate}::date) + interval '6 days',
        interval '1 day'
      ) AS date
    )
    SELECT
      TO_CHAR(c.date, 'Dy') AS label,
      COUNT(n.id) AS new_cases,
      COUNT(cl.id) AS closed_cases
    FROM calendar c
    LEFT JOIN cases n
      ON DATE(n."createdAt") = DATE(c.date)
     AND n."companyId" = ${companyId}
    LEFT JOIN cases cl
      ON DATE(cl."closedAt") = DATE(c.date)
     AND cl."companyId" = ${companyId}
    GROUP BY c.date
    ORDER BY c.date
  `;

        const monthSql = Prisma.sql`
    WITH calendar AS (
      SELECT generate_series(
        date_trunc('month', ${referenceDate}::date),
        date_trunc('month', ${referenceDate}::date) + interval '1 month - 1 day',
        interval '1 day'
      ) AS date
    )
    SELECT
      TO_CHAR(c.date, 'DD/MM') AS label,
      COUNT(n.id) AS new_cases,
      COUNT(cl.id) AS closed_cases
    FROM calendar c
    LEFT JOIN cases n
      ON DATE(n."createdAt") = DATE(c.date)
     AND n."companyId" = ${companyId}
    LEFT JOIN cases cl
      ON DATE(cl."closedAt") = DATE(c.date)
     AND cl."companyId" = ${companyId}
    GROUP BY c.date
    ORDER BY c.date
  `;

        const yearSql = Prisma.sql`
    WITH calendar AS (
      SELECT generate_series(
        date_trunc('year', ${referenceDate}::date),
        date_trunc('year', ${referenceDate}::date) + interval '11 months',
        interval '1 month'
      ) AS date
    )
    SELECT
      TO_CHAR(c.date, 'MM') AS label,
      COUNT(DISTINCT n.id)  AS new_cases,
      COUNT(DISTINCT cl.id) AS closed_cases
    FROM calendar c
    LEFT JOIN cases n
      ON DATE_TRUNC('month', n."createdAt") = DATE_TRUNC('month', c.date)
     AND n."companyId" = ${companyId}
    LEFT JOIN cases cl
      ON DATE_TRUNC('month', cl."closedAt") = DATE_TRUNC('month', c.date)
     AND cl."companyId" = ${companyId}
    GROUP BY c.date
    ORDER BY c.date
  `;

        const sqlByPeriod = {
            week: weekSql,
            month: monthSql,
            year: yearSql,
        };

        const result = await prismaClient.$queryRaw<
            {
                label: string;
                new_cases: bigint;
                closed_cases: bigint;
            }[]
        >(sqlByPeriod[period]);

        return result.map((r) => ({
            label: r.label,
            newCases: Number(r.new_cases),
            closedCases: Number(r.closed_cases),
        }));
    }
}
