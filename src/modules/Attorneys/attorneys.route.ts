import { FastifyInstance } from 'fastify';
import { AttorneyController } from './attorneys.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const attorneyController = new AttorneyController();

export const attorneysRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/attorney', { preHandler: authMiddleware }, attorneyController.findAll);
    fastify.post('/attorney', { preHandler: authMiddleware }, attorneyController.register);
    fastify.put('/attorney', { preHandler: authMiddleware }, attorneyController.update);
    fastify.delete('/attorney', { preHandler: authMiddleware }, attorneyController.remove as any);
};
