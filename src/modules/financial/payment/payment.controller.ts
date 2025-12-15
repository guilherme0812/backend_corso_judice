import { FastifyReply, FastifyRequest } from 'fastify';
import { PaymentService } from './payment.service';
import { getAllSchema } from './payment.schema';
import { UserDataType } from '../../users/repository/IUserRepository';

export class PaymentController {
    constructor() {
        this.service = new PaymentService();
    }
    service: any;

    async create(req: FastifyRequest, reply: FastifyReply) {
        const payment = await this.service.createPayment(req.body as any);
        reply.status(201).send(payment);
    }

    async getAll(
        req: FastifyRequest & {
            user: UserDataType;
        },
        reply: FastifyReply,
    ) {
        const query = req.query as {
            caseId?: string;
            companyId?: string;
            startDueDate?: string;
            endDueDate?: string;
            status?: string;
        };

        const companyId = req.user.companyId as string;

        const params = {
            ...query,
            companyId,
        };

        const validationSchema = getAllSchema.safeParse(query);
        if (!validationSchema.success) {
            return reply.status(400).send({ error: 'Invalid query parameters', details: validationSchema.error.errors });
        }

        const payments = await this.service.getAll(params);
        reply.status(200).send(payments);
    }
}
