import { FastifyReply, FastifyRequest } from 'fastify';
import { AttorneyService } from './attorneys.service';
import { AttorneyPrismaRepository } from './repository/AttorneyPrismaRepository';
import { AttorneyDataType, CreateAttorney, GenericParams } from './repository/IAttorneyRepository';

const attorneyRepository = new AttorneyPrismaRepository();
const attorneyService = new AttorneyService(attorneyRepository);

interface UserQuery {
    id: string;
}

export class AttorneyController {
    async findAll(request: FastifyRequest<{ Querystring: GenericParams }>, reply: FastifyReply) {
        try {
            const params: GenericParams = {
                companyId: request.user?.companyId,
                name: request.query.name,
            };

            const result = await attorneyService.findAll(params);
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
                ...(request.body as CreateAttorney),
                companyId: (request as any).user?.companyId,
            };

            console.log('body: ', body);
            const data = await attorneyService.create(body as CreateAttorney);
            reply.status(201).send(data);
        } catch (error: any) {
            reply.status(400).send({ message: error.message });
        }
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        try {
            const user = await attorneyService.update(request.body as AttorneyDataType);
            reply.status(200).send(user);
        } catch (error: any) {
            reply.status(400).send({ message: error.message });
        }
    }

    async remove(request: FastifyRequest<{ Querystring: UserQuery }>, reply: FastifyReply) {
        try {
            const user = await attorneyService.remove(request.query.id);
            reply.status(200).send(user);
        } catch (error: any) {
            reply.status(error.status || 400).send({ message: error.message });
        }
    }
}
