import { FastifyReply, FastifyRequest } from 'fastify';
import { CaseService } from './cases.service';
import { CasePrismaRepository } from './repository/CasePrismaRepository';
import { createResponse } from '../../utils/responseHelper';
import { CaseDataType, CreateCase } from './repository/ICaseRepository';
import { UserDataType } from '../users/repository/IUserRepository';

const caseRepository = new CasePrismaRepository();
const caseService = new CaseService(caseRepository);

export interface CaseQuery {
    id: string;
}

export type CustomFastifyQueryParam = FastifyRequest<{
    Querystring: CaseQuery;
}>;

export class CasesController {
    async findAll(request: FastifyRequest, reply: FastifyReply) {
        try {
            const cases = await caseService.findAll();
            reply.status(200).send(cases);
        } catch (error: any) {
            reply.status(error.status || 400).send({ message: error.message });
        }
    }

    async findOne(request: CustomFastifyQueryParam, reply: FastifyReply) {
        try {
            const id = request.query.id;

            if (!id) {
                throw createResponse('Id is required');
            }

            const caseData = await caseService.findOne(id);
            reply.status(200).send(caseData);
        } catch (error: any) {
            reply.status(error.status || 400).send({ message: error.message });
        }
    }

    async create(
        request: FastifyRequest & {
            user: UserDataType;
        },
        reply: FastifyReply,
    ) {
        try {
            if (request.body) {
                const body = {
                    ...request?.body,
                    companyId: (request as any).user?.companyId,
                };
                await caseService.create(body as CreateCase);
                reply.status(200).send(createResponse('Case created'));
            } else {
                reply.status(400).send({ message: 'body is required' });
            }
        } catch (error: any) {
            reply.status(error.status || 400).send({ message: error.message });
        }
    }

    async update(request: CustomFastifyQueryParam, reply: FastifyReply) {
        try {
            const id = (request as any)?.body.id;

            if (!id) {
                throw createResponse('Id is required');
            }

            await caseService.update(id, request.body as CaseDataType);
            reply.status(200).send(createResponse('Case updated'));
        } catch (error: any) {
            reply.status(error.status || 400).send({ message: error.message });
        }
    }

    async delete(request: CustomFastifyQueryParam, reply: FastifyReply) {
        try {
            const id = request.query.id;

            if (!id) {
                throw createResponse('Id is required');
            }

            await caseService.remove(id);
            reply.status(201).send(createResponse('Case deleted'));
        } catch (error: any) {
            reply.status(error.status || 400).send({ message: error.message });
        }
    }
}
