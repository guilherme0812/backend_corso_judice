import { prismaClient } from '../../../prisma/prismaClient';
import { GetCashFlowDTO, GetMonthlyReportDTO, GetPaymentsDTO } from '../finances.schema';
import { CreatePayment } from './IFinancesRepository';

export class FinancesPrismaRepository {
    createPayment(data: CreatePayment) {
        return prismaClient.payment.create({ data });
    }

    getPayment(id: string) {
        return prismaClient.payment.findUnique({
            where: { id },
            include: { case: true },
        });
    }

    getPayments(params: GetPaymentsDTO) {
        const whereClause: any = {};

        if (params.companyId) {
            whereClause.case = {
                companyId: params.companyId,
            };
        }

        if (params.caseId) {
            whereClause.caseId = params.caseId;
        }

        if (params.status) {
            whereClause.status = params.status;
        }

        if (params.dueDate) {
            // whereClause.dueDate = { lte: new Date(params.dueDate) };
            whereClause.dueDate = new Date(params.dueDate);
        }

        if (params.paidAt) {
            whereClause.paidAt = { gte: new Date(params.paidAt) };
        }

        return prismaClient.payment.findMany({
            where: whereClause,
            include: { case: true },
        });
    }

    payPayment(id: string) {
        return prismaClient.payment.update({
            where: { id },
            data: { status: 'PAID', paidAt: new Date() },
        });
    }

    createSplits(paymentId: string, splits: any[]) {
        return prismaClient.$transaction(
            splits.map((s) =>
                prismaClient.paymentSplit.create({
                    data: { ...s, paymentId },
                }),
            ),
        );
    }

    generateTransactions(paymentId: string, splits: any[]) {
        return prismaClient.$transaction(
            splits.map((s) =>
                prismaClient.financialTransaction.create({
                    data: {
                        type: s.type === 'OFFICE' ? 'INCOME' : 'EXPENSE',
                        amount: s.amount,
                        categoryId: 'FINANCIAL_AUTOMATIC',
                        origin: 'PAYMENT',
                        paymentId,
                    },
                }),
            ),
        );
    }

    getCashFlow(params: GetCashFlowDTO) {
        const whereClause: any = {};

        if (params.companyId) {
            whereClause.payment = {
                case: {
                    companyId: params.companyId,
                },
            };
        }

        if (params.startDate) {
            whereClause.date = { gte: new Date(params.startDate) };
        }
        if (params.endDate) {
            whereClause.date = {
                ...whereClause.date,
                lte: new Date(params.endDate),
            };
        }

        return prismaClient.financialTransaction.findMany({
            where: whereClause,
            orderBy: { date: 'desc' },
        });
    }

    monthlyReport({ companyId }: GetMonthlyReportDTO) {
        return prismaClient.$queryRaw`
            SELECT
                TO_CHAR(ft.date, 'YYYY-MM') AS month,
                SUM(CASE WHEN ft.type = 'INCOME' THEN ft.amount ELSE 0 END) AS income,
                SUM(CASE WHEN ft.type = 'EXPENSE' THEN ft.amount ELSE 0 END) AS expense
            FROM 
                "FinancialTransaction" ft
            LEFT JOIN "Payment" p ON p.id = ft."paymentId"
            LEFT JOIN "cases" c ON c.id = p."caseId"
            WHERE 
                c."companyId" = ${companyId}
            GROUP BY 
                month
            ORDER BY 
                month DESC
        `;
    }
}
