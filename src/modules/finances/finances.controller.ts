import { FastifyReply, FastifyRequest } from 'fastify';
import { FinancesService } from './finances.service';
import { FinancesPrismaRepository } from './repository/financesPrismaRepository';
import {
    createPaymentSchema,
    GetCashFlowDTO,
    getCashFlowSchema,
    getMonthlyReportSchema,
    getPaymentsSchema,
    payPaymentSchema,
} from './finances.schema';
import { UserDataType } from '../users/repository/IUserRepository';

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
            const validate = payPaymentSchema.safeParse(request.query);
            if (!validate.success) {
                return reply.status(400).send({
                    message: 'Validation error',
                    errors: validate.error.errors,
                });
            }
            const result = await this.financesServices.payPayment(request.query.id);
            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async getCashFlow(
        request: FastifyRequest<{ Querystring: GetCashFlowDTO }> & {
            user: UserDataType;
        },
        reply: FastifyReply,
    ) {
        try {
            const validate = getCashFlowSchema.safeParse(request.query);
            if (!validate.success) {
                return reply.status(400).send({
                    message: 'Validation error',
                    errors: validate.error.errors,
                });
            }
             const params = { ...request.query, companyId: request.user.companyId };
            const result = await this.financesServices.getCashFlow(params as any);
            
            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async monthlyReport(
        request: FastifyRequest<{ Querystring: GetCashFlowDTO }> & {
            user: UserDataType;
        },
        reply: FastifyReply,
    ) {
        try {
            const validate = getMonthlyReportSchema.safeParse(request.query);
            if (!validate.success) {
                return reply.status(400).send({
                    message: 'Validation error',
                    errors: validate.error.errors,
                });
            }

             const params = { ...request.query, companyId: request.user.companyId };

            const result = await this.financesServices.monthlyReport(params as any);
            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async getPayments(
        request: FastifyRequest<{ Querystring: GetCashFlowDTO }> & {
            user: UserDataType;
        },
        reply: FastifyReply,
    ) {
        try {
            const params = { ...request.query, companyId: request.user.companyId };

            const validateParams = getPaymentsSchema.safeParse(params);
            if (!validateParams.success) {
                return reply.status(400).send({
                    message: 'Validation error',
                    errors: validateParams.error.errors,
                });
            }

            const result = await this.financesServices.getPayments(params as any);
            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }
}
