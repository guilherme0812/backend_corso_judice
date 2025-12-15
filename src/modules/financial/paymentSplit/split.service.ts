import { PaymentSplitRepository } from './splitRepository';

export class PaymentSplitService {
    repository: any;
    constructor() {
        this.repository = new PaymentSplitRepository();
    }

    async generateSplitsForPayment(caseObj: any, payment: any) {
        const splits = [] as any[];

        if (caseObj.lawyerFee) {
            splits.push({
                paymentId: payment.id,
                type: 'LAWYER',
                amount: (payment.amount * caseObj.lawyerFee) / 100,
            });
        }

        if (caseObj.businessFee) {
            splits.push({
                paymentId: payment.id,
                type: 'OFFICE',
                amount: (payment.amount * caseObj.businessFee) / 100,
            });
        }

        if (caseObj.indicatorFee) {
            splits.push({
                paymentId: payment.id,
                type: 'INDICATOR',
                amount: (payment.amount * caseObj.indicatorFee) / 100,
            });
        }

        return this.repository.createMany(splits);
    }
}
