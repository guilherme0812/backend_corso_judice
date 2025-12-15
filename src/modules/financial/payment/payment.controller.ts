import { FastifyReply, FastifyRequest } from 'fastify';
import { PaymentService } from './payment.service';

export class PaymentController {
    constructor() {
        this.service = new PaymentService();
    }
    service: any;

    async create(req: FastifyRequest, reply: FastifyReply) {
        const payment = await this.service.createPayment(req.body as any);
        reply.status(201).send(payment);
    }
}
