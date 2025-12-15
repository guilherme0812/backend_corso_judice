import { FastifyInstance } from 'fastify';
import { authMiddleware } from '../../../middleware/authMiddleware';
import { PaymentController } from './payment.controller';

const controller = new PaymentController();

export async function paymentRoutes(app: FastifyInstance) {
    app.get('/financial/payments', { preHandler: authMiddleware }, controller.getAll.bind(controller));
    app.post('/financial/createPayment', { preHandler: authMiddleware }, controller.create.bind(controller));
    // app.post('/financial/payPayment', { preHandler: authMiddleware }, (controller as any).markAsPaid.bind(controller));
}
