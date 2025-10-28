import { FastifyInstance } from 'fastify';
import { authMiddleware } from '../../middleware/authMiddleware';
import { GraphController } from './graphs.controller';

const graphController = new GraphController();

export const graphsRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/graph', { preHandler: authMiddleware }, graphController.findAll as any);
    fastify.post('/graph', { preHandler: authMiddleware }, graphController.register);
    fastify.put('/graph', { preHandler: authMiddleware }, graphController.update);
    fastify.delete('/graph', { preHandler: authMiddleware }, graphController.remove as any);
    fastify.post('/graph/test', graphController.test);
};
