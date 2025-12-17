import { CaseService } from '../../cases/cases.service';
import { CasePrismaRepository } from '../../cases/repository/CasePrismaRepository';
import { FinancialEntryService } from '../entry/entry.service';
import { PaymentSplitService } from '../paymentSplit/split.service';
import { GetAllParamsDTO } from './payment.schema';
import { PaymentRepository } from './paymentRepository';

export class PaymentService {
    repository: any;
    financialEntryService: any;
    paymentSplitService: any;
    caseService: any;

    constructor() {
        this.repository = new PaymentRepository();
        this.financialEntryService = new FinancialEntryService();
        this.paymentSplitService = new PaymentSplitService();
        this.caseService = new CaseService(new CasePrismaRepository());
    }

    async getAll(params: GetAllParamsDTO) {
        return this.repository.findAll(params);
    }

    async createPayment(data: any) {
        const body = {
            ...data,
            dueDate: new Date(data.dueDate).toISOString(),
        };
        console.log('body', body);
        const payment = await this.repository.create(body);
        const caseObj = await this.caseService.findOne(data.caseId);

        await this.paymentSplitService.generateSplitsForPayment(caseObj, payment);

        await this.financialEntryService.createReceivableFromPayment(payment, caseObj);

        return payment;
    }

    async markPaymentAsPaid(paymentId: string) {
        const payment = await this.repository.markPaymentAsPaid(paymentId);

        return payment;
    }
}
