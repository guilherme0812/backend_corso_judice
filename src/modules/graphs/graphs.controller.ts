import { FastifyReply, FastifyRequest } from 'fastify';
import { GraphPrismaRepository } from './repository/GraphPrismaRepository';
import { GraphService } from './graphs.service';
import { CreateGraph, GenericParams, GraphDataType } from './repository/IGraphRepository';

const graphRepository = new GraphPrismaRepository();
const graphService = new GraphService(graphRepository);

interface UserQuery {
    id: string;
}

export class GraphController {
    async findAll(request: FastifyRequest<{ Querystring: GenericParams }>, reply: FastifyReply) {
        try {
            const params: GenericParams = {
                companyId: request.user?.companyId,
                name: request.query.name,
            };

            const result = await graphService.findAll(params);
            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async register(request: FastifyRequest, reply: FastifyReply) {
        try {
            const body = {
                ...(request.body as CreateGraph),
                companyId: (request as any).user?.companyId,
            };

            const data = await graphService.create(body as CreateGraph);
            reply.status(201).send(data);
        } catch (error: any) {
            reply.status(400).send({ message: error.message });
        }
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        try {
            const user = await graphService.update(request.body as GraphDataType);
            reply.status(200).send(user);
        } catch (error: any) {
            reply.status(400).send({ message: error.message });
        }
    }

    async remove(request: FastifyRequest<{ Querystring: UserQuery }>, reply: FastifyReply) {
        try {
            const user = await graphService.remove(request.query.id);
            reply.status(200).send(user);
        } catch (error: any) {
            reply.status(error.status || 400).send({ message: error.message });
        }
    }

    async jsonConvertion(request: FastifyRequest, reply: FastifyReply) {
        try {
            const body = request.body;

            const data = await graphService.processMessage('json-conversion', body as CreateGraph);
            reply.status(201).send(data);
        } catch (error: any) {
            reply.status(400).send({ message: error.message });
        }
    }
}
