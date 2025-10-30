import { FastifyInstance } from 'fastify';
import { authMiddleware } from '../../middleware/authMiddleware';
import { CustomDocumentMappingController } from './customDocumentMapping.controller';

const customDocumentMappingController = new CustomDocumentMappingController();

export const customDocumentMappingRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/customDocumentMappings', { preHandler: authMiddleware }, customDocumentMappingController.findAll as any);
    fastify.get('/customDocumentMapping', { preHandler: authMiddleware }, customDocumentMappingController.findOne as any);
    fastify.get(
        '/company/customDocumentMapping',
        { preHandler: authMiddleware },
        customDocumentMappingController.findOneByCompanyId as any,
    );
    fastify.post('/customDocumentMapping', { preHandler: authMiddleware }, customDocumentMappingController.register);
    fastify.put('/customDocumentMapping', { preHandler: authMiddleware }, customDocumentMappingController.update);
    fastify.delete('/customDocumentMapping', { preHandler: authMiddleware }, customDocumentMappingController.remove as any);
};
