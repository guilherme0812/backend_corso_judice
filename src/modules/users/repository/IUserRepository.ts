import { UserStatus } from "@prisma/client";

export type GenericParams = {
    companyId?: string | null;
    name?: string;
};

export enum Role {
    admin = 'admin',
    owner = 'owner',
    employee = 'employee',
}

export enum UserStatusEnum {
    'PENDING', // Criado, mas ainda sem empresa vinculada
    'ACTIVE', // Ativo e com empresa associada
    'INACTIVE', // Inativo por escolha do usuário ou administrador
    'SUSPENDED', // Bloqueado temporariamente
    'DELETED', // Conta removida (opcional)
}

export interface UserCreate {
    id?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    companyId: string;
    role: Role;
    phone: string | null;
    hasWhatsapp: boolean;
    profilePicture: string | null;
    status?: UserStatus;
    lastLoginAt: string | null;
}

export interface UserDataType {
    id: string;
    email: string;
    password: string | null;
    role: any;
    firstName: string;
    lastName: string;
    phone: string | null;
    hasWhatsapp: Boolean;
    profilePicture: String | null;
    status?: UserStatus;
    lastLoginAt: Date | null;
    createAt: Date;
    updateAt: Date;
    companyId: string | null;
}

export type LoginBody = {
    email: string;
    password: string;
};

export interface IUserRepository {
    findAll: (params: GenericParams) => Promise<UserDataType[]>;
    findUserByEmail: (email: string) => Promise<UserDataType | null>;
    findOne: (id: string) => Promise<UserDataType | null>;
    create: (body: UserCreate) => Promise<any>;
    update(data: UserCreate): Promise<UserDataType>;
    remove(id: string): Promise<UserDataType>;
}
