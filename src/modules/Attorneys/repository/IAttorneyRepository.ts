export type GenericParams = {
    companyId?: string | null;
    name?: string;
};

export interface AttorneyDataType {
    id: string;
    firstName: string;
    lastName: string;
    licenceNumber: string;
    licenceJurisdiction: string;
    licenceCountryCode: string | null;
    phone: string | null;
    email: string;
    nationality: string | null;
    maritalStatus: string | null;
    professionalAddress: string | null;
    companyId: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateAttorney = Omit<AttorneyDataType, 'id' | 'createdAt' | 'updatedAt'> & {
    companyId: string;
};

export interface IAttorneyRepository {
    findAll: (params: GenericParams) => Promise<AttorneyDataType[]>;
    findOne: (id: string) => Promise<AttorneyDataType | null>;
    create: (body: CreateAttorney) => Promise<AttorneyDataType>;
    update(data: AttorneyDataType): Promise<AttorneyDataType>;
    remove(id: string): Promise<AttorneyDataType>;
}
