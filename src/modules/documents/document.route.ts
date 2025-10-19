import { FastifyInstance } from 'fastify';
import { DocumentController } from './document.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const documentController = new DocumentController();

export async function documentsRoutes(fastify: FastifyInstance) {
    fastify.post('/document/replacePlceholders', documentController.uploadAndReplace);
}
