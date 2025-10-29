import { CompiledGraph } from '@langchain/langgraph';
import { prismaClient } from '../../../prisma/prismaClient';

export abstract class BaseGraph {
    protected prisma = prismaClient;

    graphAgent?: CompiledGraph<any, any, any, any>;
    DEFAULTS: Record<string, any> = {};

    abstract type: string;

    protected async initializeGraph(): Promise<any> {
        throw new Error('Method not implemented. This method should be implemented by the child class');
    }

    public async getGraphAgent(): Promise<any> {
        if (this.graphAgent) return this.graphAgent;
    }

    public async invokeGraph(data: any): Promise<any> {
        this.getGraphAgent();
        throw new Error('Method not implemented. This method should be implemented by the child class');
    }
}
