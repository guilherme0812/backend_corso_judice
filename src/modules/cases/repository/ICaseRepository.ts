enum CaseStatus {
    PENDING = 'PENDING',
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
}

export interface CaseDataType {
    id: string;
    caseNumber: string;
    description: string;
    status: CaseStatus;
    openedAt: string;
    closedAt: string;
    client?: {
        document: string;
        firstName: string;
        lastName: string;
    };
}

export interface CreateCase {
    companyId: string;
    clientId: string;
    caseNumber: string;
    description: string;
    status: CaseStatus;
}

export interface FindAllParameters {
    companyId?: string;
    clientId?: string;
    name?: string
}

export interface ICaseRepository {
    findAll: (params?: FindAllParameters) => Promise<CaseDataType[]>;
    findOne: (id: string) => Promise<CaseDataType | null>;
    create: (body: CreateCase) => Promise<CaseDataType>;
    update(id: string, data: Partial<CaseDataType>): Promise<CaseDataType>;
    remove(id: string): Promise<CaseDataType>;
}
