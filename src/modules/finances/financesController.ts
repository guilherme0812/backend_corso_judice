import { FastifyReply, FastifyRequest } from 'fastify';
import { FinancesService } from './financesService';
import { FinancesPrismaRepository } from './repository/financesPrismaRepository';
import { createPaymentSchema } from './finances.schema';

export class FinancesController {
    constructor() {
        this.financesRepository = new FinancesPrismaRepository();
        this.financesServices = new FinancesService(this.financesRepository);
    }
    financesServices: FinancesService;
    financesRepository: FinancesPrismaRepository;

    async createPayment(request: FastifyRequest, reply: FastifyReply) {
        try {
            if (request.body) {
                const validate = createPaymentSchema.safeParse(request.body);
                
                if (!validate.success) {
                    return reply.status(400).send({
                        message: 'Validation error',
                        errors: validate.error.errors,
                    });
                }

                const body = {
                    ...request.body,
                };
                const result = await this.financesServices.createPayment(body);
                return reply.status(201).send(result);
            }
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async payPayment(request: FastifyRequest<{ Querystring: { id: string } }>, reply: FastifyReply) {
        try {
            const result = await this.financesServices.payPayment(request.query.id);
            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async getCashFlow(request: FastifyRequest, reply: FastifyReply) {
        try {
            const result = await this.financesServices.getCashFlow();
            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async monthlyReport(request: FastifyRequest, reply: FastifyReply) {
        try {
            const result = await this.financesServices.monthlyReport();
            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }
}
