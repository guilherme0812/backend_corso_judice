export type GenericParams = {
    companyId?: string | null;
    name?: string;
};
export interface ClientCreate {
    document: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    email: string | null;
    address: string | null;
    cityId: string | null;
    stateId: string | null;
    countryId: string | null;
    birthDate: Date | null;
    notes: string | null;
    companyId: string | null;
    password: string;
    hasWhatsapp: boolean;
    profilePicture: string;
    isActive: boolean;
}

export interface ClientDataType {
    document: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    email: string | null;
    hasWhatsapp: boolean;
    addressStreet: string | null;
    addressNumber: string | null;
    addressComplement: string | null;
    addressZipCode: string | null;
    zone: string | null;
    birthDate: Date | null;
    notes: string | null;
    nacionality: string | null;
    cityId: string | null;
    stateId: string | null;
    countryId: string | null;
    companyId: string | null;
}

export interface IClientRepository {
    findOne(document: string): Promise<ClientDataType | null>;
    findAll(params: GenericParams): Promise<ClientDataType[]>;
    create(data: ClientCreate): Promise<ClientDataType>;
    update(data: ClientDataType): Promise<ClientDataType>;
    remove(document: string): Promise<ClientDataType>;
}
