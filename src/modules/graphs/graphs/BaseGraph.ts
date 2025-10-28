import { prismaClient } from '../../../prisma/prismaClient';

export abstract class BaseGraph {
    protected prisma = prismaClient;

    abstract type: string;

    protected async initializeGraph() {
        throw new Error('Method not implemented. This method should be implemented by the child class');
    }

    public async getGraphAgent() {
        throw new Error('Method not implemented. This method should be implemented by the child class');
    }

    public async invokeGraph(data: any): Promise<any> {
        this.getGraphAgent();
        throw new Error('Method not implemented. This method should be implemented by the child class');
    }
}
