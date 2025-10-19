import { ClientPrismaRepository } from './repository/ClientPrismaRepository';
import { ClientService } from './clients.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GenericParams } from './repository/IClientRepository';
import { UserDataType } from '../users/repository/IUserRepository';

interface ClientQuery {
    document: string;
}

const clientRepository = new ClientPrismaRepository();
const clientService = new ClientService(clientRepository);

export class ClientsController {
    async findOne(request: FastifyRequest<{ Querystring: ClientQuery }>, reply: FastifyReply) {
        try {
            const result = await clientService.findUniqueOrThrow(request.query.document as string);
            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async findAll(
        request: FastifyRequest<{ Querystring: GenericParams }> & {
            user: UserDataType;
        },
        reply: FastifyReply,
    ) {
        try {
            const params: GenericParams = {
                companyId: request.user?.companyId,
                name: request.query.name,
            };

            const result = await clientService.findAll(params);
            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async create(request: FastifyRequest, reply: FastifyReply) {
        try {
            if (request.body) {
                const body = {
                    ...request.body,
                    companyId: (request as any).user?.companyId,
                };
                const result = await clientService.create(body as any);
                return reply.status(201).send(result);
            }
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        try {
            const result = await clientService.update(request.body as any);
            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async remove(request: FastifyRequest<{ Querystring: ClientQuery }>, reply: FastifyReply) {
        try {
            const result = await clientService.remove(request.query.document as string);
            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }
}
