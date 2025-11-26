import { prismaClient } from '../../../prisma/prismaClient';
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

    getCashFlow() {
        return prismaClient.financialTransaction.findMany({
            orderBy: { date: 'desc' },
        });
    }

    monthlyReport() {
        return prismaClient.$queryRaw`
      SELECT 
        DATE_FORMAT(date, '%Y-%m') as month,
        SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) as expense
      FROM FinancialTransaction
      GROUP BY month
      ORDER BY month DESC;
    `;
    }
}
