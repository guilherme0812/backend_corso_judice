import { prismaClient } from '../../../prisma/prismaClient';
import { GetAllParamsDTO } from './payment.schema';

export class PaymentRepository {
    findAll({ caseId, companyId, endDueDate, startDueDate, status }: GetAllParamsDTO) {
        const whereClause: any = {};

        if (caseId) {
            whereClause.caseId = caseId;
        }
        if (companyId) {
            whereClause.case = { companyId };
        }
        if (startDueDate) {
            whereClause.dueDate = { gte: new Date(startDueDate) };
        }
        if (endDueDate) {
            whereClause.dueDate = { ...whereClause.dueDate, lte: new Date(endDueDate) };
        }
        if (status) {
            whereClause.status = status;
        }

        return prismaClient.payment.findMany({
            where: { ...whereClause },
            include: {
                splits: true,
                case: {
                    select: {
                        title: true,
                        processNumber: true,
                        lawyerFee: true,
                        businessFee: true,
                        indicatorFee: true,
                        indicatorId: true,
                        client: {
                            select: {
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
                entries: {
                    select: {
                        id: true,
                        type: true,
                        status: true,
                        amount: true,
                    },
                },
            },
        });
    }

    create(data: any) {
        return prismaClient.payment.create({
            data,
            include: { splits: true },
        });
    }

    async markPaymentAsPaid(paymentId: string) {
        const payment = await prismaClient.payment.update({
            where: { id: paymentId },
            data: { paidAt: new Date(), status: 'PAID' },
            include: { splits: true },
        });

        return payment;
    }

    findById(id: string) {
        return prismaClient.payment.findUnique({
            where: { id },
            include: { splits: true },
        });
    }
}
