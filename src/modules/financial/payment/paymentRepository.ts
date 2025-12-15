import { prismaClient } from '../../../prisma/prismaClient';

export class PaymentRepository {
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
