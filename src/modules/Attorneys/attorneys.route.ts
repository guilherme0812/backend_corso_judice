import { FastifyInstance } from 'fastify';
import { AttorneyController } from './attorneys.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const attorneyController = new AttorneyController();

export const attorneysRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/attorney', attorneyController.findAll);
    fastify.post('/attorney', attorneyController.register);
    fastify.put('/attorney', attorneyController.update);
    fastify.delete('/attorney', attorneyController.remove);
};
