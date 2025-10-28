import { createResponse } from '../../utils/responseHelper';
import { BaseGraph } from './graphs/BaseGraph';
import { GraphFactory } from './graph.factory';
import { CreateGraph, GenericParams, GraphDataType, IGraphRepository } from './repository/IGraphRepository';

export class GraphService {
    constructor(private readonly graphRepository: IGraphRepository) {}

    private graphAgent?: BaseGraph;

    async findAll(params: GenericParams) {
        return this.graphRepository.findAll(params);
    }

    async findOne(document: string) {
        const graph = await this.graphRepository.findOne(document);

        return graph;
    }

    async findUniqueOrThrow(id: string) {
        const graph = await this.findOne(id);

        if (!graph) {
            throw { status: 404, message: 'Graph not found' };
        }

        return graph;
    }

    async create({ companyId, ...body }: CreateGraph) {
        const alreadyCreated = body?.id ? await this.findUniqueOrThrow(body?.id) : false;

        if (alreadyCreated) {
            throw createResponse('Can not create this graph', 400);
        }

        return this.graphRepository.create({
            ...body,
            company: { connect: { id: companyId } },
        } as any);
    }

    async update(body: GraphDataType) {
        const existClient = this.findOne(body.id);

        if (!existClient) {
            throw { status: 404, message: 'Graph not found' };
        }

        return this.graphRepository.update(body);
    }

    async remove(document: string) {
        const existRecord = this.findOne(document);

        if (!existRecord) {
            throw { status: 404, message: 'Graph not found' };
        }

        return this.graphRepository.remove(document);
    }

    async processMessage(type: string, data: any) {
        const agent = GraphFactory.invokeGraph(type);

        const result = await agent.invokeGraph(data);
        return result;
    }
}
