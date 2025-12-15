import { Case, Payment, PrismaClient } from '@prisma/client';

export class PaymentSplitRepository {
    private prisma = new PrismaClient();

    async create(data: any) {
        return this.prisma.paymentSplit.create({ data });
    }

    async findById(id: string) {
        return this.prisma.paymentSplit.findUnique({ where: { id } });
    }

    async listByPaymentId(paymentId: string) {
        return this.prisma.paymentSplit.findMany({ where: { paymentId } });
    }

    async createMany(splits: any[]) {
        return this.prisma.paymentSplit.createMany({ data: splits });
    }
}
