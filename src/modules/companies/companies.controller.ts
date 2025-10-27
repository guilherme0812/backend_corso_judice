import { CompanyPrismaRepository } from './repositories/CompanyPrismaRepository';
import { CompanyService } from './companies.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { createResponse } from '../../utils/responseHelper';

const companyRepository = new CompanyPrismaRepository();
const companyService = new CompanyService(companyRepository);

export interface CompanyQuery {
    id: string;
}

type CustomFastifyQueryParam = FastifyRequest<{ Querystring: CompanyQuery }>;

export class CompaniesController {
    async findOne(request: CustomFastifyQueryParam, reply: FastifyReply) {
        try {
            const result = await companyService.findOneOrThrow(request.query.id as string);
            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async findAll(request: FastifyRequest, reply: FastifyReply) {
        try {
            const result = await companyService.findAll();
            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async create(request: FastifyRequest, reply: FastifyReply) {
        try {
            const result = await companyService.create(request.body as any);
            return reply.status(201).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async update(request: CustomFastifyQueryParam, reply: FastifyReply) {
        try {
            if (!request.query.id) {
                return createResponse('id is required');
            }

            const result = await companyService.update(request.query.id, request.body as any);
            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async remove(request: CustomFastifyQueryParam, reply: FastifyReply) {
        try {
            const result = await companyService.remove(request.query.id as string);
            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }
}
