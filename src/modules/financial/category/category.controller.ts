import { FastifyReply, FastifyRequest } from 'fastify';
import { FinancialCategoryService } from './category.service';
import { UserDataType } from '../../users/repository/IUserRepository';
import {
    createFinancialCategorySchema,
    getAllCategorySchema,
    GetFinancialCategoriesDTO,
    GetFinancialCategoryDTO,
} from './category.schema';

export class FinancialCategoryController {
    private service = new FinancialCategoryService();

    async findAllCategories(
        req: FastifyRequest & {
            user: UserDataType;
        },
        reply: FastifyReply,
    ) {
        try {
            // const query = req.query as { startDate?: string; endDate?: string; limit?: string };
            const companyId = req.user.companyId as string;

            const params: GetFinancialCategoriesDTO = {
                companyId,
            };
            const validationSchema = getAllCategorySchema.safeParse(params);
            if (!validationSchema.success) {
                return reply.status(400).send({ error: 'Invalid query parameters', details: validationSchema.error });
            }

            const entries = await this.service.findAll(params);
            reply.send(entries);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async findOneById(
        req: FastifyRequest & {
            user: UserDataType;
        },
        reply: FastifyReply,
    ) {
        try {
            const query = req.query as { id: string };

            const params: GetFinancialCategoryDTO = {
                id: query.id,
            };
            const validationSchema = getAllCategorySchema.safeParse(params);
            if (!validationSchema.success) {
                return reply.status(400).send({ error: 'Invalid query parameters', details: validationSchema.error });
            }

            const category = await this.service.findOneOrThrow(params.id);

            reply.status(200).send(category);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async createCategory(
        req: FastifyRequest & {
            user: UserDataType;
        } & any,
        reply: FastifyReply,
    ) {
        try {
            const companyId = req.user.companyId;

            const body = {
                companyId: companyId,
                ...req.body,
            };

            const validationSchema = createFinancialCategorySchema.safeParse(body);
            if (!validationSchema.success) {
                return reply.status(400).send({ error: 'Invalid query parameters', details: validationSchema.error });
            }

            const payment = await this.service.create(req.body);
            reply.status(200).send(payment);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }

    async remove(
        req: FastifyRequest & {
            user: UserDataType;
        },
        reply: FastifyReply,
    ) {
        try {
            const query = req.query as { id: string };

            const params: GetFinancialCategoryDTO = {
                id: query.id,
            };
            const validationSchema = getAllCategorySchema.safeParse(params);
            if (!validationSchema.success) {
                return reply.status(400).send({ error: 'Invalid query parameters', details: validationSchema.error });
            }

            const entries = await this.service.remove(params.id);
            reply.status(200).send(entries);
        } catch (error: any) {
            return reply.status(error.status || 500).send({
                message: error.message || 'Internal server error',
            });
        }
    }
}
