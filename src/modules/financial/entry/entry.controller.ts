import { FastifyRequest, FastifyReply } from 'fastify';
import { FinancialEntryService } from './entry.service';
import { UserDataType } from '../../users/repository/IUserRepository';
import {
    cashFlowSchema,
    createEntryPaymentDTO,
    createEntryPaymentSchema,
    GetListDTO,
    getListSchema,
    GetSummaryDTO,
    getSummarySchema,
    payPaymentSchema,
} from './entry.schema';

export class FinancialEntryController {
    private service = new FinancialEntryService();

    async list(
        req: FastifyRequest & {
            user: UserDataType;
        },
        reply: FastifyReply,
    ) {
        const query = req.query as { startDate?: string; endDate?: string; limit?: string };
        const companyId = req.user.companyId as string;

        const params: GetListDTO = {
            startDate: query.startDate,
            endDate: query.endDate,
            companyId,
            limit: query.limit ? Number(query.limit) : undefined,
        };
        const validationSchema = getListSchema.safeParse(params);
        if (!validationSchema.success) {
            return reply.status(400).send({ error: 'Invalid query parameters', details: validationSchema.error.errors });
        }

        const entries = await this.service.list(params);
        reply.send(entries);
    }

    async getAggregatedByMonth(
        req: FastifyRequest & {
            user: UserDataType;
        },
        reply: FastifyReply,
    ) {
        const companyId = req.user.companyId as string;
        const { startDate, endDate } = req.query as { startDate: string; endDate: string };

        const data = await this.service.getAggregatedByMonth(startDate, endDate, companyId);
        reply.send(data);
    }

    async payPayment(
        req: FastifyRequest & {
            user: UserDataType;
        } & any,
        reply: FastifyReply,
    ) {
        const params = req.query;

        const validationSchema = payPaymentSchema.safeParse(params);
        if (!validationSchema.success) {
            return reply.status(400).send({ error: 'Invalid query parameters', details: validationSchema.error.errors });
        }

        const payment = await this.service.markAsPaid(params.id);
        reply.status(200).send(payment);
    }

    async createEntryPayment(
        req: FastifyRequest & {
            user: UserDataType;
        } & any,
        reply: FastifyReply,
    ) {
        
        const body: createEntryPaymentDTO = {
            ...req.body,
            dueDate: new Date(req.body.dueDate).toISOString(),
            companyId: req.user.companyId,
        };

        const validationSchema = createEntryPaymentSchema.safeParse(body);
        if (!validationSchema.success) {
            return reply.status(400).send({ error: 'Invalid body', details: validationSchema.error.errors });
        }

        const payment = await this.service.createEntryPayment(body);
        reply.status(200).send(payment);
    }

    
    async getRealizedFlow(
        req: FastifyRequest & {
            user: UserDataType;
        } & any,
        reply: FastifyReply,
    ) {
        const query = req.query as { startDate?: string; endDate?: string };
        const companyId = req.user.companyId as string;

        const params: GetSummaryDTO = {
            startDate: query.startDate,
            endDate: query.endDate,
            companyId,
        };

        const validationSchema = cashFlowSchema.safeParse(params);
        if (!validationSchema.success) {
            return reply.status(400).send({ error: 'Invalid query parameters', details: validationSchema.error.errors });
        }

        const { startDate, endDate } = params;

        const data = await this.service.getRealizedFlow(startDate || '', endDate || '');
        reply.status(200).send(data);
    }

    async getProjectedFlow(
        req: FastifyRequest & {
            user: UserDataType;
        } & any,
        reply: FastifyReply,
    ) {
        const query = req.query as { startDate?: string; endDate?: string };
        const companyId = req.user.companyId as string;

        const params: GetSummaryDTO = {
            startDate: query.startDate,
            endDate: query.endDate,
            companyId,
        };

        const validationSchema = cashFlowSchema.safeParse(params);
        if (!validationSchema.success) {
            return reply.status(400).send({ error: 'Invalid query parameters', details: validationSchema.error.errors });
        }

        const { startDate, endDate } = params;

        const data = await this.service.getProjectedFlow(new Date(startDate || ''), new Date(endDate || ''));
        reply.status(200).send(data);
    }

    async getSummary(
        req: FastifyRequest & {
            user: UserDataType;
        } & any,
        reply: FastifyReply,
    ) {
        const query = req.query as { startDate?: string; endDate?: string };
        const companyId = req.user.companyId as string;

        const params: GetSummaryDTO = {
            startDate: query.startDate,
            endDate: query.endDate,
            companyId,
        };

        const validationSchema = getSummarySchema.safeParse(params);
        if (!validationSchema.success) {
            return reply.status(400).send({ error: 'Invalid query parameters', details: validationSchema.error.errors });
        }

        const data = await this.service.getSummary(params);
        reply.status(200).send(data);
    }
}
