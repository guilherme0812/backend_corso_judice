import { FastifyInstance } from 'fastify';
import { CompaniesController } from './companies.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import { isAdminMiddleware } from '../../middleware/validateRole';

const companiesController = new CompaniesController();

export async function companiesRoutes(fastify: FastifyInstance) {
    fastify.get('/admin/companies', { preHandler: [authMiddleware, isAdminMiddleware] }, companiesController.findAll);
    fastify.get('/admin/company', { preHandler: [authMiddleware, isAdminMiddleware] }, companiesController.findOne as any);
    fastify.post('/admin/company', { preHandler: [authMiddleware, isAdminMiddleware] }, companiesController.create as any);
    fastify.put('/admin/company', { preHandler: [authMiddleware, isAdminMiddleware] }, companiesController.update as any);
    fastify.delete('/admin/company', { preHandler: [authMiddleware, isAdminMiddleware] }, companiesController.remove as any);
}
