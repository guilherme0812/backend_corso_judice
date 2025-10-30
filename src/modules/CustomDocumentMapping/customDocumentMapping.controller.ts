import { FastifyReply, FastifyRequest } from 'fastify';
import { CustomDocumentMappingService } from './customDocumentMapping.service';
import { CustomDocumentMappingPrismaRepository } from './repository/CustomDocumentMappingPrismaRepository';
import { CreateCustomDocumentMapping, CustomDocumentMappingDataType } from './repository/ICustomDocumentMappingRepository';
import { createResponse } from '../../utils/responseHelper';

const customDocumentMappingRepository = new CustomDocumentMappingPrismaRepository();
const customDocumentMappingService = new CustomDocumentMappingService(customDocumentMappingRepository);

interface QueryParam {
    id: string;
}

export class CustomDocumentMappingController {
    async findAll(request: FastifyRequest, reply: FastifyReply) {
        try {
            const result = await customDocumentMappingService.findAll();
            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async findOne(request: FastifyRequest<{ Querystring: QueryParam }>, reply: FastifyReply) {
        try {
            const result = await customDocumentMappingService.findUniqueOrThrow(request.query.id as string);
            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async findOneByCompanyId(request: FastifyRequest<{ Querystring: { companyId: string } }>, reply: FastifyReply) {
        try {
            const result = await customDocumentMappingService.findOneByCompanyId(request.query.companyId as string);
            if (!result) {
                return reply.status(404).send(createResponse('not nound', 404));
            }

            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async register(request: FastifyRequest, reply: FastifyReply) {
        try {
            const body = request.body as CreateCustomDocumentMapping;
            const companyId: string = body?.companyId ? body?.companyId : (request as any).user?.companyId;
            const customBody = { ...body, companyId };

            const data = await customDocumentMappingService.create(customBody as CreateCustomDocumentMapping);
            reply.status(201).send(data);
        } catch (error: any) {
            reply.status(400).send({ message: error.message });
        }
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        try {
            const user = await customDocumentMappingService.update(request.body as CustomDocumentMappingDataType);
            reply.status(200).send(user);
        } catch (error: any) {
            reply.status(400).send({ message: error.message });
        }
    }

    async remove(request: FastifyRequest<{ Querystring: QueryParam }>, reply: FastifyReply) {
        try {
            const user = await customDocumentMappingService.remove(request.query.id);
            reply.status(200).send(user);
        } catch (error: any) {
            reply.status(error.status || 400).send({ message: error.message });
        }
    }
}
