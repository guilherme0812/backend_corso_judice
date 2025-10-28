import { InputJsonValue, JsonValue } from '@prisma/client/runtime/library';

export interface GraphDataType {
    id: string;
    name: string;
    type: string;
    description: string;
    config: JsonValue;
    archetype: string | null;
    companyId: string;
    createdAt: Date;
    updatedAt: Date;
}

export type GenericParams = {
    companyId?: string | null;
    name?: string;
};

export type CreateGraph = Omit<GraphDataType, 'id' | 'createdAt' | 'updatedAt'> & {
    id?: string;
    data?: any;
};

export interface IGraphRepository {
    findAll: (params: GenericParams) => Promise<GraphDataType[]>;
    findOne: (id: string) => Promise<GraphDataType | null>;
    create: (body: CreateGraph) => Promise<GraphDataType>;
    update(data: GraphDataType): Promise<GraphDataType>;
    remove(id: string): Promise<GraphDataType>;
}
