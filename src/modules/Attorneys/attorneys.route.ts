import { FastifyInstance } from 'fastify';
import { AttorneyController } from './attorneys.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import { isAdminMiddleware } from '../../middleware/validateRole';

const attorneyController = new AttorneyController();

export const attorneysRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/attorney', { preHandler: authMiddleware }, attorneyController.findAllByUser as any);
    fastify.post('/attorney', { preHandler: authMiddleware }, attorneyController.register);
    fastify.put('/attorney', { preHandler: authMiddleware }, attorneyController.update);
    fastify.delete('/attorney', { preHandler: authMiddleware }, attorneyController.remove as any);

    fastify.get('/admin/attorney', { preHandler: [authMiddleware, isAdminMiddleware] }, attorneyController.findAll as any);
};
