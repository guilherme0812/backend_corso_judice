import { JsonValue } from '@prisma/client/runtime/library';

export interface CustomDocumentMappingDataType {
    id: string;
    companyId: string;
    customMappingJson: JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateCustomDocumentMapping = Omit<CustomDocumentMappingDataType, 'id' | 'createdAt' | 'updatedAt'>;

export interface ICustomDocumentMappingRepository {
    findAll: () => Promise<CustomDocumentMappingDataType[]>;
    findOne: (id: string) => Promise<CustomDocumentMappingDataType | null>;
    findOneByCompanyId: (id: string) => Promise<CustomDocumentMappingDataType | null>;
    create: (body: CreateCustomDocumentMapping) => Promise<CustomDocumentMappingDataType>;
    update(data: CustomDocumentMappingDataType): Promise<CustomDocumentMappingDataType>;
    remove(id: string): Promise<CustomDocumentMappingDataType>;
}
