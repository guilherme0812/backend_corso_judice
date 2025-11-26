import { authMiddleware } from '../../middleware/authMiddleware';
// import { isAdminMiddleware } from '../../middleware/validateRole';
import { FastifyInstance } from 'fastify';
import { FinancesController } from './financesController';

const financesController = new FinancesController();

export const financesRoutes = async (fastify: FastifyInstance) => {
    fastify.post('/finances/payment', { preHandler: authMiddleware }, financesController.createPayment);
    fastify.post('/finances/payment/pay', { preHandler: authMiddleware }, financesController.payPayment as any);
    fastify.get('/finances/cashflow', { preHandler: authMiddleware }, financesController.getCashFlow);
    fastify.get('/finances/monthly', { preHandler: authMiddleware }, financesController.monthlyReport.bind(financesController));
};
