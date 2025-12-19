import { EntryOrigin, EntryStatus, EntryType } from '@prisma/client';
import { FinancialEntryRepository } from './entryRepository';
import { PaymentService } from '../payment/payment.service';
import { createEntryPaymentDTO, GetSummaryDTO } from './entry.schema';
import { PaymentSplitDataType, PaymentSplitType } from '../paymentSplit/split.schema';

export class FinancialEntryService {
    private repo = new FinancialEntryRepository();

    async createEntryPayment(body: createEntryPaymentDTO) {
        const result = await this.repo.create(body);
        return result;
    }

    async createReceivableFromPayment(payment: any, caseObj: any) {
        const result = await this.repo.create({
            companyId: caseObj?.companyId,
            type: EntryType.RECEIVABLE,
            origin: EntryOrigin.PAYMENT,
            amount: payment.amount,
            dueDate: payment.dueDate,
            paymentId: payment.id,
            categoryId: payment.categoryId,
            caseId: payment.caseId,
        });

        return result;
    }

    async createPayablesFromSplit(payment: any, splits: PaymentSplitDataType[], companyId: string) {
        const promises = splits
            .filter((item) => item.type != PaymentSplitType.OFFICE)
            .map((split) =>
                this.repo.create({
                    companyId: companyId,
                    type: EntryType.PAYABLE,
                    origin: EntryOrigin.SPLIT,
                    amount: split.amount,
                    dueDate: payment.paidAt ?? new Date(),
                    // paidAt: payment.paidAt ?? new Date(),
                    paymentId: payment.id,
                    splitId: split.id,
                    categoryId: payment.categoryId,
                    caseId: payment.caseId,
                }),
            );

        return Promise.all(promises);
    }

    async markAsPaid(entryId: string) {
        const paymentEntry = await this.repo.updateStatus(entryId, EntryStatus.PAID, new Date());

        if (paymentEntry.paymentId && paymentEntry.type == 'RECEIVABLE') {
            const paymentService = new PaymentService();
            const payment = await paymentService.markPaymentAsPaid(paymentEntry.paymentId);

            await this.createPayablesFromSplit(payment, payment.splits, paymentEntry?.companyId);
        }

        return paymentEntry;
    }

    async list(params: GetSummaryDTO) {
        return this.repo.list(params);
    }

    async getAggregatedByMonth(startDate: any, endDate: string, companyId: string) {
        return this.repo.getAggregatedByMonth(startDate, endDate, companyId);
    }

    async getRealizedFlow(startDate: string, endDate: string) {
        return this.repo.getRealizedFlow(startDate, endDate);
    }

    async getProjectedFlow(startDate: Date, endDate: Date) {
        return this.repo.getProjectedFlow(startDate, endDate);
    }

    async getSummary(params: GetSummaryDTO) {
        return this.repo.getSummary(params);
    }
}
