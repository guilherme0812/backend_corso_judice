import { authMiddleware } from '../../middleware/authMiddleware';
import { isAdminMiddleware } from '../../middleware/validateRole';
import { ClientsController } from './clients.controller';
import { FastifyInstance } from 'fastify';

const clientsController = new ClientsController();

export const clientsRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/clients', { preHandler: authMiddleware }, clientsController.findAllByUser as any);
    fastify.get('/client', { preHandler: authMiddleware }, clientsController.findOne as any);
    fastify.post('/client', { preHandler: authMiddleware }, clientsController.create);
    fastify.put('/client', { preHandler: authMiddleware }, clientsController.update);
    fastify.delete('/client', { preHandler: authMiddleware }, clientsController.remove as any);

    fastify.get('/admin/clients', { preHandler: [authMiddleware, isAdminMiddleware] }, clientsController.findAll as any);
};
