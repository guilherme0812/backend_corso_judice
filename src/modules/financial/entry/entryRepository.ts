import { EntryStatus } from '@prisma/client';
import { prismaClient } from '../../../prisma/prismaClient';
import { GetListDTO, GetSummaryDTO } from './entry.schema';

export class FinancialEntryRepository {
    async create(data: any) {
        return prismaClient.financialEntry.create({ data: { ...data } });
    }

    async findById(id: string) {
        return prismaClient.financialEntry.findUnique({ where: { id } });
    }

    async updateStatus(id: string, status: EntryStatus, paidAt?: Date) {
        return prismaClient.financialEntry.update({
            where: { id },
            data: { status, paidAt },
        });
    }

    async list({ companyId, startDate, endDate, limit, startDueDate, endDueDate, status }: GetListDTO) {
        const whereClause: any = {};

        if (companyId) {
            whereClause.companyId = companyId;
        }
        if (startDate) whereClause.gte = new Date(startDate);

        if (endDate) whereClause.lte = new Date(endDate);

        if (startDueDate && endDueDate) {
            whereClause.dueDate = { gte: new Date(startDueDate), lte: new Date(endDueDate) };
        }

        if (status) {
            whereClause.status = status
        }

        return prismaClient.financialEntry.findMany({
            where: { ...whereClause },
            take: limit || undefined,
            select: {
                id: true,
                type: true,
                origin: true,
                amount: true,
                dueDate: true,
                status: true,
                createdAt: true,
                paidAt: true,
                category: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }

    async getAggregatedByMonth(startDate: any, endDate: string, companyId: string) {
        const result = await prismaClient.$queryRawUnsafe(
            `
            SELECT 
  TO_CHAR(DATE_TRUNC('month', fe."paidAt"), 'MM/YYYY') AS month,
  SUM(CASE WHEN fe."type" = 'RECEIVABLE' THEN fe."amount" ELSE 0 END) AS total_received,
  SUM(CASE WHEN fe."type" = 'PAYABLE' THEN fe."amount" ELSE 0 END) AS total_paid
FROM financial_entries fe
WHERE fe."paidAt" IS NOT NULL
  AND fe."paidAt" BETWEEN CAST($1 AS timestamp) AND CAST($2 AS timestamp)
  AND fe."companyId" = $3
GROUP BY DATE_TRUNC('month', fe."paidAt")
ORDER BY DATE_TRUNC('month', fe."paidAt") ASC;
            `,
            startDate,
            endDate,
            companyId,
        );

        return result as any[];
    }

    async getRealizedFlow(startDate: string, endDate: string) {
        const entries = await prismaClient.financialEntry.findMany({
            where: {
                dueDate: { gte: new Date(startDate), lte: new Date(endDate) },
                status: 'PAID',
            },
            include: {
                transactions: true,
                category: true,
                case: true,
                payment: true,
                split: true,
            },
            orderBy: { dueDate: 'asc' },
        });
        return entries;
    }

    async getProjectedFlow(startDate: string, endDate: string) {
        const entries = await prismaClient.financialEntry.findMany({
            where: {
                dueDate: { gte: new Date(startDate), lte: new Date(endDate) },
                status: { in: ['PENDING', 'OVERDUE'] },
            },
            include: {
                category: true,
                case: true,
                payment: true,
                split: true,
            },
            orderBy: { dueDate: 'asc' },
        });

        // Calcula saldo projetado
        let projectedAmount = 0;
        const flow = entries.map((e) => {
            projectedAmount += e.type === 'RECEIVABLE' ? e.amount : -e.amount;
            return {
                ...e,
                projectedAmount,
            };
        });

        return flow;
    }

    async getSummary({ startDate, endDate, companyId }: GetSummaryDTO) {
        const dateFilter: any = {};
        if (startDate) dateFilter.gte = new Date(startDate);
        if (endDate) dateFilter.lte = new Date(endDate);

        // Recebido: RECEIVABLE pagos
        const receivedAgg = await prismaClient.financialEntry.aggregate({
            where: {
                type: 'RECEIVABLE',
                status: 'PAID',
                ...(startDate || endDate ? { dueDate: dateFilter } : {}),
            },
            _sum: { amount: true },
        });

        // Pago: PAYABLE pagos
        const paidAgg = await prismaClient.financialEntry.aggregate({
            where: {
                companyId: companyId,
                type: 'PAYABLE',
                status: 'PAID',
                ...(startDate || endDate ? { dueDate: dateFilter } : {}),
            },
            _sum: { amount: true },
        });

        // A receber: RECEIVABLE pendentes/overdue
        const receivableAgg = await prismaClient.financialEntry.aggregate({
            where: {
                companyId: companyId,
                type: 'RECEIVABLE',
                status: { in: ['PENDING'] },
                ...(startDate || endDate ? { dueDate: dateFilter } : {}),
            },
            _sum: { amount: true },
        });

        // A pagar: PAYABLE pendentes/overdue
        const payableAgg = await prismaClient.financialEntry.aggregate({
            where: {
                companyId: companyId,
                type: 'PAYABLE',
                status: { in: ['PENDING', 'OVERDUE'] },
                ...(startDate || endDate ? { dueDate: dateFilter } : {}),
            },
            _sum: { amount: true },
        });

        // Saldo atual = recebido - pago
        const currencentBalance = (receivedAgg._sum.amount || 0) - (paidAgg._sum.amount || 0);

        return {
            received: receivedAgg._sum.amount || 0,
            paid: paidAgg._sum.amount || 0,
            receivable: receivableAgg._sum.amount || 0,
            payable: payableAgg._sum.amount || 0,
            currencentBalance,
        };
    }
}
