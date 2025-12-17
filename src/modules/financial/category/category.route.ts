import { FastifyInstance } from 'fastify';
import { authMiddleware } from '../../../middleware/authMiddleware';
import { FinancialCategoryController } from './category.controller';

const controller = new FinancialCategoryController();
export async function financialCategoryRoutes(app: FastifyInstance) {
    app.get('/financial/categories', { preHandler: authMiddleware }, controller.findAllCategories.bind(controller));
    app.get('/financial/category', { preHandler: authMiddleware }, controller.findOneById.bind(controller));
    app.post('/financial/category', { preHandler: authMiddleware }, controller.createCategory.bind(controller));
    app.delete('/financial/category', { preHandler: authMiddleware }, controller.remove.bind(controller));
}
