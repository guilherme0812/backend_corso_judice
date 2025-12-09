import { GetCashFlowDTO, GetMonthlyReportDTO, GetPaymentsDTO } from "./finances.schema";

export class FinancesService {
    constructor(private readonly financesRepository: any) {}

    async createPayment(dto: any) {
        return this.financesRepository.createPayment(dto);
    }

    async payPayment(paymentId: string) {
        const payment = await this.financesRepository.getPayment(paymentId);

        if (!payment) throw new Error('Pagamento não encontrado.');
        if (payment.status === 'PAID') throw new Error('Pagamento já realizado.');

        const updated = await this.financesRepository.payPayment(paymentId);

        // lógica de splits
        const { case: caseData } = payment;

        const splits = [
            {
                type: 'OFFICE',
                amount: (payment.amount * caseData.businessFee) / 100,
            },
            {
                type: 'LAWYER',
                amount: (payment.amount * caseData.lawyerFee) / 100,
            },
        ];

        if (caseData.indicatorFee) {
            splits.push({
                type: 'INDICATOR',
                amount: (payment.amount * caseData.indicatorFee) / 100,
            });
        }

        await this.financesRepository.createSplits(paymentId, splits);

        // gerar transações
        await this.financesRepository.generateTransactions(paymentId, splits);

        return { message: 'Pagamento realizado com sucesso' };
    }

    async getCashFlow(params: GetCashFlowDTO) {
        return this.financesRepository.getCashFlow(params);
    }

    async monthlyReport(params: GetMonthlyReportDTO) {
        return this.financesRepository.monthlyReport(params);
    }

    async getPayments(params: GetPaymentsDTO) {
        return this.financesRepository.getPayments(params);
    }
}
