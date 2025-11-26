import { authMiddleware } from '../../middleware/authMiddleware';
// import { isAdminMiddleware } from '../../middleware/validateRole';
import { FastifyInstance } from 'fastify';
import { FinancesController } from './financesController';

const financesController = new FinancesController();

export const financesRoutes = async (fastify: FastifyInstance) => {
    fastify.post('/finances/payment', { preHandler: authMiddleware }, financesController.createPayment.bind(financesController));
    fastify.post('/finances/payment/pay', { preHandler: authMiddleware }, (financesController.payPayment as any).bind(financesController));
    fastify.get('/finances/cashflow', { preHandler: authMiddleware }, financesController.getCashFlow.bind(financesController));
    fastify.get('/finances/monthly', { preHandler: authMiddleware }, financesController.monthlyReport.bind(financesController));
};
