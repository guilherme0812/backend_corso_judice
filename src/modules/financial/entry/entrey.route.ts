import { FastifyInstance } from 'fastify';
import { FinancialEntryController } from './entry.controller';
import { authMiddleware } from '../../../middleware/authMiddleware';

const controller = new FinancialEntryController();
export async function financialEntryRoutes(app: FastifyInstance) {
    app.get('/financial', { preHandler: authMiddleware }, controller.list.bind(controller));
    app.get('/financial/aggregatedByMonth', { preHandler: authMiddleware }, controller.getAggregatedByMonth.bind(controller));
    app.post('/financial/createEntryPayment', { preHandler: authMiddleware }, controller.createEntryPayment.bind(controller));
    app.post('/financial/payPayment', { preHandler: authMiddleware }, controller.payPayment.bind(controller));
    app.get('/financial/realizedFlow', { preHandler: authMiddleware }, controller.getRealizedFlow.bind(controller));
    app.get('/financial/projectedFlow', { preHandler: authMiddleware }, controller.getProjectedFlow.bind(controller));
    app.get('/financial/summary', { preHandler: authMiddleware }, controller.getSummary.bind(controller));
}
